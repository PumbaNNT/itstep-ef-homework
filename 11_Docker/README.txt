ДЗ з Docker - що зробити (близько 15-20 хвилин)

1) PowerShell ВІД ІМЕНІ АДМІНІСТРАТОРА, перейти в цю папку і виконати:
     powershell -ExecutionPolicy Bypass -File .\1_install_wsl.ps1
   Підтвердити вікна, ПЕРЕЗАВАНТАЖИТИ комп'ютер.

2) Після перезавантаження відкриється Ubuntu - придумати логін і пароль.

3) У вікні Ubuntu виконати:
     curl -fsSL https://raw.githubusercontent.com/PumbaNNT/itstep-ef-homework/main/11_Docker/2_docker_homework.sh -o hw.sh && bash hw.sh
   Скрипт попросить пароль Ubuntu (для sudo), встановить Docker,
   завантажить образи, запустить Postgres (5400) та 4 ігри (80-83).

4) Зробити скріншоти, які скрипт покаже в кінці, і передати їх Claude.
