-- ДЗ 7.1. Об'єднання (JOIN, UNION)
-- База даних «Академія» (Academy) + 9 запитів
-- Примітка: в описі корпус (Building) має бути від 1 до 5, але запит 9 шукає
-- аудиторії корпусу 6, тому обмеження розширено до 1..6.

USE master;
GO

IF DB_ID(N'AcademyJoin') IS NOT NULL
BEGIN
    ALTER DATABASE AcademyJoin SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE AcademyJoin;
END
GO

CREATE DATABASE AcademyJoin;
GO

USE AcademyJoin;
GO

-- ===================== Структура =====================

CREATE TABLE Teachers
(
    Id      INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name    NVARCHAR(MAX)      NOT NULL CHECK (Name <> N''),
    Surname NVARCHAR(MAX)      NOT NULL CHECK (Surname <> N'')
);

CREATE TABLE Assistants (Id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY, TeacherId INT NOT NULL REFERENCES Teachers (Id));
CREATE TABLE Curators   (Id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY, TeacherId INT NOT NULL REFERENCES Teachers (Id));
CREATE TABLE Deans      (Id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY, TeacherId INT NOT NULL REFERENCES Teachers (Id));
CREATE TABLE Heads      (Id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY, TeacherId INT NOT NULL REFERENCES Teachers (Id));

CREATE TABLE Faculties
(
    Id       INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Building INT                NOT NULL CHECK (Building BETWEEN 1 AND 6),
    Name     NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N''),
    DeanId   INT                NOT NULL REFERENCES Deans (Id)
);

CREATE TABLE Departments
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Building  INT                NOT NULL CHECK (Building BETWEEN 1 AND 6),
    Name      NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N''),
    FacultyId INT                NOT NULL REFERENCES Faculties (Id),
    HeadId    INT                NOT NULL REFERENCES Heads (Id)
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

CREATE TABLE LectureRooms
(
    Id       INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Building INT                NOT NULL CHECK (Building BETWEEN 1 AND 6),
    Name     NVARCHAR(10)       NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Subjects
(
    Id   INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Lectures
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    SubjectId INT                NOT NULL REFERENCES Subjects (Id),
    TeacherId INT                NOT NULL REFERENCES Teachers (Id)
);

CREATE TABLE GroupsLectures
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    GroupId   INT                NOT NULL REFERENCES Groups (Id),
    LectureId INT                NOT NULL REFERENCES Lectures (Id)
);

CREATE TABLE Schedules
(
    Id            INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Class         INT                NOT NULL CHECK (Class BETWEEN 1 AND 8),
    DayOfWeek     INT                NOT NULL CHECK (DayOfWeek BETWEEN 1 AND 7),
    Week          INT                NOT NULL CHECK (Week BETWEEN 1 AND 52),
    LectureId     INT                NOT NULL REFERENCES Lectures (Id),
    LectureRoomId INT                NOT NULL REFERENCES LectureRooms (Id)
);
GO

-- ===================== Дані =====================

INSERT INTO Teachers (Name, Surname) VALUES
    (N'Edward',   N'Hopper'),     -- 1 декан CS
    (N'Alex',     N'Carmack'),    -- 2 завідувач Software Development
    (N'Samantha', N'Adams'),      -- 3 викладач, куратор
    (N'Jack',     N'Underhill'),  -- 4 асистент
    (N'Anna',     N'Petrenko'),   -- 5 асистент, куратор
    (N'Ivan',     N'Bondar'),     -- 6 декан Design
    (N'Olga',     N'Melnyk');     -- 7 завідувач Graphic Design, куратор

INSERT INTO Deans (TeacherId)      VALUES (1), (6);
INSERT INTO Heads (TeacherId)      VALUES (2), (7);
INSERT INTO Curators (TeacherId)   VALUES (3), (5), (7);
INSERT INTO Assistants (TeacherId) VALUES (4), (5);

INSERT INTO Faculties (Building, Name, DeanId) VALUES
    (1, N'Computer Science', 1),
    (3, N'Design',           2);

INSERT INTO Departments (Building, Name, FacultyId, HeadId) VALUES
    (2, N'Software Development', 1, 1),
    (2, N'Databases',            1, 1),
    (4, N'Graphic Design',       2, 2);

INSERT INTO Groups (Name, [Year], DepartmentId) VALUES
    (N'F505', 5, 1),   -- 1
    (N'P107', 1, 1),   -- 2
    (N'D501', 5, 2),   -- 3
    (N'G301', 3, 3);   -- 4

-- куратори: Adams - F505 (SD), Petrenko - D501 (Databases), Melnyk - G301
INSERT INTO GroupsCurators (CuratorId, GroupId) VALUES (1, 1), (2, 3), (3, 4);

INSERT INTO LectureRooms (Building, Name) VALUES
    (6, N'A311'),   -- 1
    (6, N'A104'),   -- 2
    (2, N'B103'),   -- 3
    (5, N'C202');   -- 4

INSERT INTO Subjects (Name) VALUES (N'Databases'), (N'C# Programming'), (N'Algorithms'), (N'Web Design');

INSERT INTO Lectures (SubjectId, TeacherId) VALUES
    (1, 1),   -- 1 Hopper - Databases
    (3, 2),   -- 2 Carmack - Algorithms
    (2, 2),   -- 3 Carmack - C#
    (2, 4),   -- 4 Underhill (асистент) - C#
    (4, 5),   -- 5 Petrenko (асистент) - Web Design
    (1, 3);   -- 6 Adams - Databases

INSERT INTO GroupsLectures (GroupId, LectureId) VALUES
    (1, 1), (1, 2), (3, 3), (1, 4), (4, 5), (2, 6), (3, 2);

-- Розклад: Class (пара), DayOfWeek (1 - понеділок), Week
INSERT INTO Schedules (Class, DayOfWeek, Week, LectureId, LectureRoomId) VALUES
    (1, 1, 1, 1, 1),   -- Hopper, пн, A311
    (2, 3, 2, 2, 3),   -- Carmack, ср (тиждень 2), пара 2, B103
    (3, 3, 2, 3, 1),   -- Carmack, ср (тиждень 2), пара 3, A311
    (1, 2, 1, 4, 2),   -- Underhill, вт, A104
    (4, 4, 1, 5, 4),   -- Petrenko, чт, C202
    (2, 1, 2, 6, 3),   -- Adams, пн, B103
    (5, 5, 1, 1, 2);   -- Hopper, пт, A104
GO

-- ===================== Запити =====================

-- 1. Аудиторії, де читає лекції викладач «Edward Hopper»
SELECT DISTINCT LR.Name
FROM LectureRooms AS LR
JOIN Schedules AS S ON S.LectureRoomId = LR.Id
JOIN Lectures AS L  ON L.Id = S.LectureId
JOIN Teachers AS T  ON T.Id = L.TeacherId
WHERE T.Name = N'Edward' AND T.Surname = N'Hopper';

-- 2. Прізвища асистентів, які читають лекції у групі «F505»
SELECT DISTINCT T.Surname
FROM Assistants AS A
JOIN Teachers AS T        ON T.Id = A.TeacherId
JOIN Lectures AS L        ON L.TeacherId = T.Id
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
WHERE G.Name = N'F505';

-- 3. Дисципліни, які читає викладач «Alex Carmack» для груп 5 курсу
SELECT DISTINCT S.Name
FROM Subjects AS S
JOIN Lectures AS L        ON L.SubjectId = S.Id
JOIN Teachers AS T        ON T.Id = L.TeacherId
JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
JOIN Groups AS G          ON G.Id = GL.GroupId
WHERE T.Name = N'Alex' AND T.Surname = N'Carmack' AND G.[Year] = 5;

-- 4. Прізвища викладачів, які не читають лекції у понеділок
SELECT T.Surname
FROM Teachers AS T
WHERE NOT EXISTS (SELECT 1
                  FROM Lectures AS L
                  JOIN Schedules AS S ON S.LectureId = L.Id
                  WHERE L.TeacherId = T.Id AND S.DayOfWeek = 1);

-- 5. Аудиторії (з корпусами), у яких немає лекцій у середу 2-го тижня на 3-й парі
SELECT LR.Name, LR.Building
FROM LectureRooms AS LR
WHERE NOT EXISTS (SELECT 1
                  FROM Schedules AS S
                  WHERE S.LectureRoomId = LR.Id
                    AND S.DayOfWeek = 3 AND S.Week = 2 AND S.Class = 3);

-- 6. Викладачі факультету «Computer Science», які не курирують групи кафедри «Software Development»
SELECT T.Name + N' ' + T.Surname AS FullName
FROM Teachers AS T
WHERE T.Id IN (SELECT L.TeacherId
               FROM Lectures AS L
               JOIN GroupsLectures AS GL ON GL.LectureId = L.Id
               JOIN Groups AS G          ON G.Id = GL.GroupId
               JOIN Departments AS D     ON D.Id = G.DepartmentId
               JOIN Faculties AS F       ON F.Id = D.FacultyId
               WHERE F.Name = N'Computer Science')
  AND T.Id NOT IN (SELECT C.TeacherId
                   FROM Curators AS C
                   JOIN GroupsCurators AS GC ON GC.CuratorId = C.Id
                   JOIN Groups AS G          ON G.Id = GC.GroupId
                   JOIN Departments AS D     ON D.Id = G.DepartmentId
                   WHERE D.Name = N'Software Development');

-- 7. Номери всіх корпусів із таблиць факультетів, кафедр та аудиторій (без повторень)
SELECT Building FROM Faculties
UNION
SELECT Building FROM Departments
UNION
SELECT Building FROM LectureRooms
ORDER BY Building;

-- 8. Повні імена: декани, завідувачі, викладачі, куратори, асистенти (саме в такому порядку)
SELECT FullName, Role
FROM (
    SELECT T.Name + N' ' + T.Surname AS FullName, N'Dean' AS Role, 1 AS SortOrder
    FROM Deans AS X JOIN Teachers AS T ON T.Id = X.TeacherId
    UNION ALL
    SELECT T.Name + N' ' + T.Surname, N'Head', 2
    FROM Heads AS X JOIN Teachers AS T ON T.Id = X.TeacherId
    UNION ALL
    SELECT T.Name + N' ' + T.Surname, N'Teacher', 3
    FROM Teachers AS T
    UNION ALL
    SELECT T.Name + N' ' + T.Surname, N'Curator', 4
    FROM Curators AS X JOIN Teachers AS T ON T.Id = X.TeacherId
    UNION ALL
    SELECT T.Name + N' ' + T.Surname, N'Assistant', 5
    FROM Assistants AS X JOIN Teachers AS T ON T.Id = X.TeacherId
) AS AllPeople
ORDER BY SortOrder, FullName;

-- 9. Дні тижня (без повторень), коли є заняття в аудиторіях «A311» та «A104» корпусу 6
SELECT DISTINCT S.DayOfWeek
FROM Schedules AS S
JOIN LectureRooms AS LR ON LR.Id = S.LectureRoomId
WHERE LR.Name IN (N'A311', N'A104') AND LR.Building = 6
ORDER BY S.DayOfWeek;
GO
