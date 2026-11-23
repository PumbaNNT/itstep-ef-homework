-- ДЗ 4. Багатотабличні бази даних
-- База даних «Академія» (Academy) + 11 запитів

USE master;
GO

IF DB_ID(N'AcademyMulti') IS NOT NULL
BEGIN
    ALTER DATABASE AcademyMulti SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE AcademyMulti;
END
GO

CREATE DATABASE AcademyMulti;
GO

USE AcademyMulti;
GO

-- ===================== Структура =====================

CREATE TABLE Curators
(
    Id      INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name    NVARCHAR(MAX)      NOT NULL CHECK (Name <> N''),
    Surname NVARCHAR(MAX)      NOT NULL CHECK (Surname <> N'')
);

CREATE TABLE Faculties
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Financing MONEY              NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    Name      NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
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
    DepartmentId INT                NOT NULL REFERENCES Departments (Id)
);

CREATE TABLE GroupsCurators
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    CuratorId INT                NOT NULL REFERENCES Curators (Id),
    GroupId   INT                NOT NULL REFERENCES Groups (Id)
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

INSERT INTO Faculties (Financing, Name) VALUES
    (20000, N'Комп''ютерні науки'),   -- 1
    (50000, N'Дизайн');               -- 2

INSERT INTO Departments (Financing, Name, FacultyId) VALUES
    (15000, N'Software Development', 1),   -- 1
    (12000, N'Databases',            1),   -- 2
    (20000, N'Graphic Design',       2);   -- 3

INSERT INTO Groups (Name, [Year], DepartmentId) VALUES
    (N'P107', 1, 1),   -- 1
    (N'P501', 5, 1),   -- 2
    (N'D221', 2, 2),   -- 3
    (N'G502', 5, 3);   -- 4

INSERT INTO Curators (Name, Surname) VALUES
    (N'Olga', N'Ivanenko'), (N'Petro', N'Sydorenko'), (N'Iryna', N'Melnyk');

INSERT INTO GroupsCurators (CuratorId, GroupId) VALUES
    (1, 1), (1, 2), (2, 3), (3, 4);

INSERT INTO Subjects (Name) VALUES
    (N'Теорія баз даних'),    -- 1
    (N'Програмування C#'),    -- 2
    (N'Веб-дизайн'),          -- 3
    (N'Алгоритми');           -- 4

INSERT INTO Teachers (Name, Salary, Surname) VALUES
    (N'Samantha', 1200, N'Adams'),     -- 1
    (N'Edward',   1100, N'Hopper'),    -- 2
    (N'Alex',     900,  N'Carmack'),   -- 3
    (N'Dave',     1300, N'McQueen');   -- 4

INSERT INTO Lectures (LectureRoom, SubjectId, TeacherId) VALUES
    (N'B103', 1, 1),   -- 1 Adams - Теорія БД
    (N'A201', 4, 1),   -- 2 Adams - Алгоритми
    (N'B103', 2, 2),   -- 3 Hopper - C#
    (N'C305', 3, 3),   -- 4 Carmack - Веб-дизайн
    (N'A201', 2, 4);   -- 5 McQueen - C#

INSERT INTO GroupsLectures (GroupId, LectureId) VALUES
    (1, 1), (1, 3), (2, 2), (2, 5), (3, 1), (4, 4), (2, 3);
GO

-- ===================== Запити =====================

-- 1. Усі можливі пари рядків викладачів та груп
SELECT T.Name + N' ' + T.Surname AS Teacher, G.Name AS [Group]
FROM Teachers AS T
CROSS JOIN Groups AS G;

-- 2. Факультети, у яких фінансування кафедр перевищує фінансування факультету
SELECT F.Name
FROM Faculties AS F
JOIN Departments AS D ON D.FacultyId = F.Id
GROUP BY F.Id, F.Name, F.Financing
HAVING SUM(D.Financing) > F.Financing;

-- 3. Прізвища кураторів груп та назви груп, які вони курують
SELECT C.Surname AS Curator, G.Name AS [Group]
FROM Curators AS C
JOIN GroupsCurators AS GC ON GC.CuratorId = C.Id
JOIN Groups AS G          ON G.Id = GC.GroupId;

-- 4. Прізвища викладачів, які читають лекції у групі «P107»
SELECT DISTINCT T.Surname
FROM Teachers AS T
JOIN Lectures AS L        ON L.TeacherId = T.Id
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
WHERE G.Name = N'P107';

-- 5. Прізвища викладачів та назви факультетів, на яких вони читають лекції
SELECT DISTINCT T.Surname, F.Name AS Faculty
FROM Teachers AS T
JOIN Lectures AS L        ON L.TeacherId = T.Id
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
JOIN Departments AS D     ON D.Id = G.DepartmentId
JOIN Faculties AS F       ON F.Id = D.FacultyId;

-- 6. Назви кафедр та назви груп, які до них відносяться
SELECT D.Name AS Department, G.Name AS [Group]
FROM Departments AS D
JOIN Groups AS G ON G.DepartmentId = D.Id;

-- 7. Назви предметів, які викладає викладач «Samantha Adams»
SELECT DISTINCT S.Name
FROM Subjects AS S
JOIN Lectures AS L ON L.SubjectId = S.Id
JOIN Teachers AS T ON T.Id = L.TeacherId
WHERE T.Name = N'Samantha' AND T.Surname = N'Adams';

-- 8. Назви кафедр, на яких викладається предмет «Теорія баз даних»
SELECT DISTINCT D.Name
FROM Departments AS D
JOIN Groups AS G          ON G.DepartmentId = D.Id
JOIN GroupsLectures AS GL ON GL.GroupId = G.Id
JOIN Lectures AS L        ON L.Id = GL.LectureId
JOIN Subjects AS S        ON S.Id = L.SubjectId
WHERE S.Name = N'Теорія баз даних';

-- 9. Назви груп, які належать до факультету «Комп'ютерні науки»
SELECT G.Name
FROM Groups AS G
JOIN Departments AS D ON D.Id = G.DepartmentId
JOIN Faculties AS F   ON F.Id = D.FacultyId
WHERE F.Name = N'Комп''ютерні науки';

-- 10. Групи 5-го курсу та факультети, до яких вони відносяться
SELECT G.Name AS [Group], F.Name AS Faculty
FROM Groups AS G
JOIN Departments AS D ON D.Id = G.DepartmentId
JOIN Faculties AS F   ON F.Id = D.FacultyId
WHERE G.[Year] = 5;

-- 11. Викладачі та їхні лекції (дисципліна + група) в аудиторії «B103»
SELECT T.Name + N' ' + T.Surname AS Teacher, S.Name AS Subject, G.Name AS [Group]
FROM Lectures AS L
JOIN Teachers AS T        ON T.Id = L.TeacherId
JOIN Subjects AS S        ON S.Id = L.SubjectId
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
WHERE L.LectureRoom = N'B103';
GO
