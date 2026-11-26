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
| 01.11.2025 | JS - Intro (умови) | [23_JS_Intro](23_JS_Intro) |
| 08.11.2025 | JS - Loops, Functions | [24_JS_Functions](24_JS_Functions) |
| 15.11.2025 | JS - Object | [25_JS_Object](25_JS_Object) |
| 15.11.2025 | JS - Object (практична) | [26_JS_Object_Practice](26_JS_Object_Practice) |
| 22.11.2025 | JS - SetInterval, setTimeout, Date, Math | [27_JS_Timers](27_JS_Timers) |
| 22.11.2025 | JS - рядки (практична) | [28_JS_Strings_Practice](28_JS_Strings_Practice) |
| 29.11.2025 | JS - OOP | [29_JS_OOP](29_JS_OOP) |
| 06.12.2025, 13.12.2025 | DOM. bootstrap 5.1 / Working with DOM | [30_JS_DOM](30_JS_DOM) |
| 20.12.2025 | Fetch (GitHub user) | [31_JS_Fetch_GitHub](31_JS_Fetch_GitHub) |
| 10.01.2026 | Promises (користувачі та справи) | [32_JS_Promises_Todos](32_JS_Promises_Todos) |
| 24.01.2026 | Intro to React | [33_React_Intro_Article](33_React_Intro_Article) |
| 31.01.2026 | Hooks UseState (хрестики-нулики) | [34_React_Hooks_TicTacToe](34_React_Hooks_TicTacToe) |
| 07.02.2026 | React Mapping | [35_React_Mapping_Movies](35_React_Mapping_Movies) |
| 14.02.2026, 21.02.2026 | Routing React (router-dom) | [36_React_Router_Rivne](36_React_Router_Rivne) |
| 28.02.2026 | React Forms | [37_React_Forms_Rivne](37_React_Forms_Rivne) |
| 07.03.2026 | React - HTTP. useEffect (пагінація) | [38_React_Pagination_Rivne](38_React_Pagination_Rivne) |
| 21.03.2026 | React - Context API (у файлі завдання — C++ vector) | [40_CPP_Vector_Railway](40_CPP_Vector_Railway) |
| 28.03.2026 | Context API (кошик) | [39_React_Context_Shop](39_React_Context_Shop) |
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

JavaScript (23-32): відкрити `index.html` у браузері.

React (33-39): у папці проєкту `npm install`, потім `npm run dev` (Vite).
