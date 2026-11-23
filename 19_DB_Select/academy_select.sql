-- ДЗ 3. Запити SELECT, INSERT, UPDATE, DELETE
-- База даних «Академія» (Academy) + 15 запитів

USE master;
GO

IF DB_ID(N'AcademySelect') IS NOT NULL
BEGIN
    ALTER DATABASE AcademySelect SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE AcademySelect;
END
GO

CREATE DATABASE AcademySelect;
GO

USE AcademySelect;
GO

-- ===================== Структура =====================

CREATE TABLE Departments
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Financing MONEY              NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    Name      NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Faculties
(
    Id   INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Dean NVARCHAR(MAX)      NOT NULL CHECK (Dean <> N''),
    Name NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

CREATE TABLE Groups
(
    Id     INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name   NVARCHAR(10)       NOT NULL UNIQUE CHECK (Name <> N''),
    Rating INT                NOT NULL CHECK (Rating BETWEEN 0 AND 5),
    [Year] INT                NOT NULL CHECK ([Year] BETWEEN 1 AND 5)
);

CREATE TABLE Teachers
(
    Id             INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    EmploymentDate DATE               NOT NULL CHECK (EmploymentDate >= '1990-01-01'),
    IsAssistant    BIT                NOT NULL DEFAULT 0,
    IsProfessor    BIT                NOT NULL DEFAULT 0,
    Name           NVARCHAR(MAX)      NOT NULL CHECK (Name <> N''),
    Position       NVARCHAR(MAX)      NOT NULL CHECK (Position <> N''),
    Premium        MONEY              NOT NULL DEFAULT 0 CHECK (Premium >= 0),
    Salary         MONEY              NOT NULL CHECK (Salary > 0),
    Surname        NVARCHAR(MAX)      NOT NULL CHECK (Surname <> N'')
);
GO

-- ===================== Дані (INSERT) =====================

INSERT INTO Departments (Financing, Name) VALUES
    (15000, N'Software Development'),
    (10000, N'Databases'),
    (30000, N'Design'),
    (8000,  N'Algorithms'),
    (26000, N'Cyber Security'),
    (12000, N'Networks');

INSERT INTO Faculties (Dean, Name) VALUES
    (N'Samantha Adams', N'Computer Science'),
    (N'John Smith',     N'Design'),
    (N'Olena Kovalenko', N'Engineering');

INSERT INTO Groups (Name, Rating, [Year]) VALUES
    (N'P101', 4, 1), (N'P205', 3, 2), (N'D311', 5, 3),
    (N'F505', 2, 5), (N'P501', 4, 5), (N'D502', 5, 5), (N'P503', 1, 5);

INSERT INTO Teachers (EmploymentDate, IsAssistant, IsProfessor, Name, Position, Premium, Salary, Surname) VALUES
    ('1998-09-01', 0, 1, N'Samantha', N'Professor',          300, 1200, N'Adams'),
    ('2005-02-15', 0, 1, N'Edward',   N'Professor',          500, 1000, N'Hopper'),
    ('2012-09-01', 0, 0, N'Alex',     N'Senior Lecturer',    400, 900,  N'Carmack'),
    ('1995-01-10', 0, 0, N'Dave',     N'Lecturer',           200, 1300, N'McQueen'),
    ('2016-03-01', 1, 0, N'Jack',     N'Assistant',          180, 600,  N'Underhill'),
    ('2019-09-01', 1, 0, N'Anna',     N'Assistant',          550, 500,  N'Petrenko'),
    ('1999-11-20', 1, 0, N'Ivan',     N'Assistant',          150, 700,  N'Bondar'),
    ('2021-01-15', 1, 0, N'Maria',    N'Assistant',          700, 650,  N'Shevchuk');
GO

-- Приклади UPDATE / DELETE
UPDATE Groups SET Rating = 3 WHERE Name = N'P205';
DELETE FROM Departments WHERE Name = N'Networks';
GO

-- ===================== Запити =====================

-- 1. Таблиця кафедр, поля у зворотному порядку
SELECT Name, Financing, Id
FROM Departments;

-- 2. Назви груп та їх рейтинги з псевдонімами полів
SELECT Name   AS [Group Name],
       Rating AS [Group Rating]
FROM Groups;

-- 3. Прізвище, відсоток ставки до надбавки та відсоток ставки до зарплати (ставка + надбавка)
SELECT Surname,
       Salary * 100 / NULLIF(Premium, 0) AS [Salary to Premium, %],
       Salary * 100 / (Salary + Premium) AS [Salary to Wage, %]
FROM Teachers;

-- 4. Факультети одним полем: «The dean of faculty [faculty] is [dean].»
SELECT N'The dean of faculty ' + Name + N' is ' + Dean + N'.' AS [Faculty]
FROM Faculties;

-- 5. Прізвища професорів зі ставкою > 1050
SELECT Surname
FROM Teachers
WHERE IsProfessor = 1 AND Salary > 1050;

-- 6. Кафедри з фінансуванням < 11000 або > 25000
SELECT Name
FROM Departments
WHERE Financing < 11000 OR Financing > 25000;

-- 7. Факультети, окрім «Computer Science»
SELECT Name
FROM Faculties
WHERE Name <> N'Computer Science';

-- 8. Прізвища та посади викладачів, які не є професорами
SELECT Surname, Position
FROM Teachers
WHERE IsProfessor = 0;

-- 9. Асистенти з надбавкою від 160 до 550
SELECT Surname, Position, Salary, Premium
FROM Teachers
WHERE IsAssistant = 1 AND Premium BETWEEN 160 AND 550;

-- 10. Прізвища та ставки асистентів
SELECT Surname, Salary
FROM Teachers
WHERE IsAssistant = 1;

-- 11. Викладачі, прийняті на роботу до 01.01.2000
SELECT Surname, Position
FROM Teachers
WHERE EmploymentDate < '2000-01-01';

-- 12. Кафедри, які в алфавітному порядку йдуть до «Software Development»
SELECT Name AS [Name of Department]
FROM Departments
WHERE Name < N'Software Development'
ORDER BY Name;

-- 13. Асистенти із зарплатою (ставка + надбавка) не більше 1200
SELECT Surname
FROM Teachers
WHERE IsAssistant = 1 AND Salary + Premium <= 1200;

-- 14. Групи 5-го курсу з рейтингом від 2 до 4
SELECT Name
FROM Groups
WHERE [Year] = 5 AND Rating BETWEEN 2 AND 4;

-- 15. Асистенти зі ставкою < 550 або надбавкою < 200
SELECT Surname
FROM Teachers
WHERE IsAssistant = 1 AND (Salary < 550 OR Premium < 200);
GO
