-- ДЗ 2. Основи взаємодії з Microsoft SQL Server
-- Створення бази даних «Академія» (Academy)

USE master;
GO

IF DB_ID(N'Academy') IS NOT NULL
BEGIN
    ALTER DATABASE Academy SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE Academy;
END
GO

CREATE DATABASE Academy;
GO

USE Academy;
GO

-- 1. Групи
CREATE TABLE Groups
(
    Id     INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name   NVARCHAR(10)       NOT NULL UNIQUE CHECK (Name <> N''),
    Rating INT                NOT NULL CHECK (Rating BETWEEN 0 AND 5),
    [Year] INT                NOT NULL CHECK ([Year] BETWEEN 1 AND 5)
);

-- 2. Кафедри
CREATE TABLE Departments
(
    Id        INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Financing MONEY              NOT NULL DEFAULT 0 CHECK (Financing >= 0),
    Name      NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

-- 3. Факультети
CREATE TABLE Faculties
(
    Id   INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100)      NOT NULL UNIQUE CHECK (Name <> N'')
);

-- 4. Викладачі
CREATE TABLE Teachers
(
    Id             INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    EmploymentDate DATE               NOT NULL CHECK (EmploymentDate >= '1990-01-01'),
    Name           NVARCHAR(MAX)      NOT NULL CHECK (Name <> N''),
    Premium        MONEY              NOT NULL DEFAULT 0 CHECK (Premium >= 0),
    Salary         MONEY              NOT NULL CHECK (Salary > 0),
    Surname        NVARCHAR(MAX)      NOT NULL CHECK (Surname <> N'')
);
GO

-- Тестові дані
INSERT INTO Groups (Name, Rating, [Year]) VALUES
    (N'P101', 4, 1), (N'P205', 3, 2), (N'D311', 5, 3), (N'F505', 2, 5), (N'P501', 4, 5);

INSERT INTO Departments (Financing, Name) VALUES
    (15000, N'Software Development'), (10000, N'Databases'), (30000, N'Design'), (DEFAULT, N'Networks');

INSERT INTO Faculties (Name) VALUES
    (N'Computer Science'), (N'Design'), (N'Engineering');

INSERT INTO Teachers (EmploymentDate, Name, Premium, Salary, Surname) VALUES
    ('1998-09-01', N'Samantha', 300, 1200, N'Adams'),
    ('2005-02-15', N'Edward',   500, 1100, N'Hopper'),
    ('2012-09-01', N'Alex',     DEFAULT, 900, N'Carmack'),
    ('1995-01-10', N'Dave',     200, 1300, N'McQueen');
GO

-- Перевірка
SELECT * FROM Groups;
SELECT * FROM Departments;
SELECT * FROM Faculties;
SELECT * FROM Teachers;
GO

-- Перевірка обмежень (кожен INSERT має завершитися помилкою CHECK / UNIQUE)
BEGIN TRY INSERT INTO Groups (Name, Rating, [Year]) VALUES (N'X1', 7, 1); END TRY
BEGIN CATCH PRINT N'OK: Rating поза межами 0..5 відхилено'; END CATCH;

BEGIN TRY INSERT INTO Groups (Name, Rating, [Year]) VALUES (N'P101', 1, 1); END TRY
BEGIN CATCH PRINT N'OK: дублікат назви групи відхилено'; END CATCH;

BEGIN TRY INSERT INTO Teachers (EmploymentDate, Name, Salary, Surname) VALUES ('1985-01-01', N'Old', 100, N'Man'); END TRY
BEGIN CATCH PRINT N'OK: дата працевлаштування < 01.01.1990 відхилена'; END CATCH;

BEGIN TRY INSERT INTO Teachers (EmploymentDate, Name, Salary, Surname) VALUES ('2000-01-01', N'Zero', 0, N'Salary'); END TRY
BEGIN CATCH PRINT N'OK: ставка <= 0 відхилена'; END CATCH;

BEGIN TRY INSERT INTO Departments (Financing, Name) VALUES (-1, N'Negative'); END TRY
BEGIN CATCH PRINT N'OK: від''ємне фінансування відхилено'; END CATCH;

BEGIN TRY INSERT INTO Faculties (Name) VALUES (N''); END TRY
BEGIN CATCH PRINT N'OK: порожня назва факультету відхилена'; END CATCH;
GO
