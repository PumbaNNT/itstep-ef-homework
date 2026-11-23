# IT STEP — домашні завдання: EF Core / ASP.NET MVC

| Дата | Завдання | Папка |
|---|---|---|
| 11.07.2026 | Вступ до Entity Framework Core | [01_EF_Intro](01_EF_Intro) |
| 18.07.2026 | EF зв'язки | [02_EF_Relations](02_EF_Relations) |
| 15.08.2026 | EF data loading / EF tracking | [03_EF_Loading](03_EF_Loading) |
| 22.08.2026 | ASP.NET MVC EF, seeder | [04_MVC_Seeder](04_MVC_Seeder) |
| 29.08.2026 | ASP.NET MVC forms, files | [05_MVC_Forms_Files](05_MVC_Forms_Files) |
| 05.09.2026 | ASP.NET MVC query / identity | [06_MVC_Identity_Query](06_MVC_Identity_Query) |
| 12.09.2026 | ASP.NET MVC session (кошик) | [07_MVC_Session_Cart](07_MVC_Session_Cart) |
| 19.09.2026 | ASP.NET API seeder / repositories | [08_API_Repositories](08_API_Repositories) |
| 26.09.2026 | ASP.NET API валідація / файли | [09_API_Service_Validation](09_API_Service_Validation) |

Стек: .NET 9, EF Core 9, SQL Server LocalDB (`(localdb)\MSSQLLocalDB`), Code First + міграції.
База даних створюється автоматично при запуску (`Database.Migrate()`).

Запуск: `dotnet run` у папці проєкту (для 01 — `dotnet run --project Games.App`).

Тестові акаунти для 06 і 07 (створюються сідером, див. `appsettings.json`):
- адмін: `admin@shop.local` / `Admin123`
- користувач: `user@shop.local` / `User123`

API (08, 09): Swagger UI - `/swagger` після `dotnet run`.
