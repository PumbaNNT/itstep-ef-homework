-- ДЗ 5. Функції агрегування
-- База даних «Академія» (Academy) + 13 запитів
-- Примітка: у таблицю Groups додано поле Students (кількість студентів),
-- бо запити 5 і 7 потребують кількості студентів у групі.

USE master;
GO

IF DB_ID(N'AcademyAggregate') IS NOT NULL
BEGIN
    ALTER DATABASE AcademyAggregate SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE AcademyAggregate;
END
GO

CREATE DATABASE AcademyAggregate;
GO

USE AcademyAggregate;
GO

-- ===================== Структура =====================

CREATE TABLE Faculties
(
    Id   INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Departments
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Financing MONEY              NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    Name      NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N''),
    FacultyId INT                NOT NULL REFERENCES Faculties (Id)
);

CREATE TABLE Groups
(
    Id           INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name         NVARCHAR(10)       NOT NULL UNIQUE CHECK (Name <> N''),
    [Year]       INT                NOT NULL CHECK ([Year] BETWEEN 1 AND 5),
    Students     INT                NOT NULL DEFAULT 0 CHECK (Students >= 0),
    DepartmentId INT                NOT NULL REFERENCES Departments (Id)
);

CREATE TABLE Subjects
(
    Id   INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Teachers
(
    Id      INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name    NVARCHAR(MAX)      NOT NULL CHECK (Name <> N''),
    Salary  MONEY              NOT NULL CHECK (Salary > 0),
    Surname NVARCHAR(MAX)      NOT NULL CHECK (Surname <> N'')
);

CREATE TABLE Lectures
(
    Id          INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    DayOfWeek   INT                NOT NULL CHECK (DayOfWeek BETWEEN 1 AND 7),
    LectureRoom NVARCHAR(MAX)      NOT NULL CHECK (LectureRoom <> N''),
    SubjectId   INT                NOT NULL REFERENCES Subjects (Id),
    TeacherId   INT                NOT NULL REFERENCES Teachers (Id)
);

CREATE TABLE GroupsLectures
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    GroupId   INT                NOT NULL REFERENCES Groups (Id),
    LectureId INT                NOT NULL REFERENCES Lectures (Id)
);
GO

-- ===================== Дані =====================

INSERT INTO Faculties (Name) VALUES (N'Computer Science'), (N'Design');

INSERT INTO Departments (Financing, Name, FacultyId) VALUES
    (15000, N'Software Development', 1),
    (12000, N'Databases',            1),
    (20000, N'Graphic Design',       2);

INSERT INTO Groups (Name, [Year], Students, DepartmentId) VALUES
    (N'P107', 1, 25, 1), (N'P501', 5, 18, 1), (N'D221', 2, 22, 2), (N'G502', 5, 12, 3);

INSERT INTO Subjects (Name) VALUES (N'Databases'), (N'C# Programming'), (N'Web Design'), (N'Algorithms');

INSERT INTO Teachers (Name, Salary, Surname) VALUES
    (N'Dave',  1300, N'McQueen'),     -- 1
    (N'Jack',  900,  N'Underhill'),   -- 2
    (N'Anna',  1100, N'Adams'),       -- 3
    (N'Ivan',  800,  N'Bondar');      -- 4

INSERT INTO Lectures (DayOfWeek, LectureRoom, SubjectId, TeacherId) VALUES
    (1, N'D201', 1, 1),   -- 1
    (1, N'A311', 2, 1),   -- 2
    (2, N'D201', 2, 2),   -- 3
    (3, N'B103', 4, 3),   -- 4
    (3, N'D201', 1, 3),   -- 5
    (5, N'C305', 3, 4);   -- 6

INSERT INTO GroupsLectures (GroupId, LectureId) VALUES
    (1, 1), (2, 2), (1, 3), (3, 3), (2, 4), (3, 5), (4, 6);
GO

-- ===================== Запити =====================

-- 1. Кількість викладачів кафедри «Software Development»
SELECT COUNT(DISTINCT T.Id) AS TeachersCount
FROM Teachers AS T
JOIN Lectures AS L        ON L.TeacherId = T.Id
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
JOIN Departments AS D     ON D.Id = G.DepartmentId
WHERE D.Name = N'Software Development';

-- 2. Кількість лекцій, які читає викладач «Dave McQueen»
SELECT COUNT(*) AS LecturesCount
FROM Lectures AS L
JOIN Teachers AS T ON T.Id = L.TeacherId
WHERE T.Name = N'Dave' AND T.Surname = N'McQueen';

-- 3. Кількість занять в аудиторії «D201»
SELECT COUNT(*) AS ClassesCount
FROM Lectures
WHERE LectureRoom = N'D201';

-- 4. Аудиторії та кількість лекцій у них
SELECT LectureRoom, COUNT(*) AS LecturesCount
FROM Lectures
GROUP BY LectureRoom;

-- 5. Кількість студентів, які відвідують лекції викладача «Jack Underhill»
SELECT SUM(G.Students) AS StudentsCount
FROM Groups AS G
WHERE G.Id IN (SELECT GL.GroupId
               FROM GroupsLectures AS GL
               JOIN Lectures AS L ON L.Id = GL.LectureId
               JOIN Teachers AS T ON T.Id = L.TeacherId
               WHERE T.Name = N'Jack' AND T.Surname = N'Underhill');

-- 6. Середня ставка викладачів факультету «Computer Science»
SELECT AVG(T.Salary) AS AvgSalary
FROM Teachers AS T
WHERE T.Id IN (SELECT L.TeacherId
               FROM Lectures AS L
               JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
               JOIN Groups AS G          ON G.Id = GL.GroupId
               JOIN Departments AS D     ON D.Id = G.DepartmentId
               JOIN Faculties AS F       ON F.Id = D.FacultyId
               WHERE F.Name = N'Computer Science');

-- 7. Мінімальна та максимальна кількість студентів серед усіх груп
SELECT MIN(Students) AS MinStudents, MAX(Students) AS MaxStudents
FROM Groups;

-- 8. Середній фонд фінансування кафедр
SELECT AVG(Financing) AS AvgFinancing
FROM Departments;

-- 9. Повні імена викладачів та кількість дисциплін, які вони читають
SELECT T.Name + N' ' + T.Surname AS Teacher, COUNT(DISTINCT L.SubjectId) AS SubjectsCount
FROM Teachers AS T
JOIN Lectures AS L ON L.TeacherId = T.Id
GROUP BY T.Id, T.Name, T.Surname;

-- 10. Кількість лекцій у кожен день тижня
SELECT DayOfWeek, COUNT(*) AS LecturesCount
FROM Lectures
GROUP BY DayOfWeek
ORDER BY DayOfWeek;

-- 11. Аудиторії та кількість кафедр, чиї лекції в них читаються
SELECT L.LectureRoom, COUNT(DISTINCT G.DepartmentId) AS DepartmentsCount
FROM Lectures AS L
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
GROUP BY L.LectureRoom;

-- 12. Факультети та кількість дисциплін, які на них читаються
SELECT F.Name AS Faculty, COUNT(DISTINCT L.SubjectId) AS SubjectsCount
FROM Faculties AS F
JOIN Departments AS D     ON D.FacultyId = F.Id
JOIN Groups AS G          ON G.DepartmentId = D.Id
JOIN GroupsLectures AS GL ON GL.GroupId = G.Id
JOIN Lectures AS L        ON L.Id = GL.LectureId
GROUP BY F.Name;

-- 13. Кількість лекцій для кожної пари викладач - аудиторія
SELECT T.Name + N' ' + T.Surname AS Teacher, L.LectureRoom, COUNT(*) AS LecturesCount
FROM Lectures AS L
JOIN Teachers AS T ON T.Id = L.TeacherId
GROUP BY T.Id, T.Name, T.Surname, L.LectureRoom
ORDER BY Teacher, L.LectureRoom;
GO
