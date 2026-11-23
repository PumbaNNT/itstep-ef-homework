# IT STEP — домашні завдання: EF Core / ASP.NET MVC

| Дата | Завдання | Папка |
|---|---|---|
| 05.07.2025 | HTML&CSS. Animation | [12_HTML_Animation](12_HTML_Animation) |
| 12.07.2025 | Grid Layout | [13_HTML_Grid](13_HTML_Grid) |
| 19.07.2025 | HTML&CSS - Tables | [14_HTML_Tables](14_HTML_Tables) |
| 16.08.2025 | HTML&CSS - Position (Практичне завдання 5) | [15_HTML_Position](15_HTML_Position) |
| 23.08.2025 | HTML - Media, Flex | [16_HTML_Media_Flex](16_HTML_Media_Flex) |
| 13.09.2025 | DB - Tables (створення БД Academy) | [18_DB_Create_Academy](18_DB_Create_Academy) |
| 20.09.2025 | DB - Select, insert, update | [19_DB_Select](19_DB_Select) |
| 27.09.2025 | DB - Tables (багатотабличні БД) | [20_DB_MultiTable](20_DB_MultiTable) |
| 04.10.2025 | DB - Функції агрегування | [21_DB_Aggregate](21_DB_Aggregate) |
| 11.10.2025 | Join & Union | [22_DB_Join_Union](22_DB_Join_Union) |
| 11.07.2026 | Вступ до Entity Framework Core | [01_EF_Intro](01_EF_Intro) |
| 18.07.2026 | EF зв'язки | [02_EF_Relations](02_EF_Relations) |
| 15.08.2026 | EF data loading / EF tracking | [03_EF_Loading](03_EF_Loading) |
| 22.08.2026 | ASP.NET MVC EF, seeder | [04_MVC_Seeder](04_MVC_Seeder) |
| 29.08.2026 | ASP.NET MVC forms, files | [05_MVC_Forms_Files](05_MVC_Forms_Files) |
| 05.09.2026 | ASP.NET MVC query / identity | [06_MVC_Identity_Query](06_MVC_Identity_Query) |
| 12.09.2026 | ASP.NET MVC session (кошик) | [07_MVC_Session_Cart](07_MVC_Session_Cart) |
| 19.09.2026 | ASP.NET API seeder / repositories | [08_API_Repositories](08_API_Repositories) |
| 26.09.2026 | ASP.NET API валідація / файли | [09_API_Service_Validation](09_API_Service_Validation) |
| 21.11.2026 | Python ООП | [10_Python_OOP](10_Python_OOP) |

Стек: .NET 9, EF Core 9, SQL Server LocalDB (`(localdb)\MSSQLLocalDB`), Code First + міграції.
База даних створюється автоматично при запуску (`Database.Migrate()`).

Запуск: `dotnet run` у папці проєкту (для 01 — `dotnet run --project Games.App`).

Тестові акаунти для 06 і 07 (створюються сідером, див. `appsettings.json`):
- адмін: `admin@shop.local` / `Admin123`
- користувач: `user@shop.local` / `User123`

API (08, 09): Swagger UI - `/swagger` після `dotnet run`.

SQL-скрипти (18-22) запускаються в SSMS або так:
`sqlcmd -S "(localdb)\MSSQLLocalDB" -f 65001 -i <файл>.sql` - кожен скрипт сам створює базу, заповнює її даними і виконує запити.
