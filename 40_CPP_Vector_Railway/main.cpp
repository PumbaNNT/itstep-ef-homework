// STL Containers. vector
// «Автоматизована інформаційна система залізничного вокзалу»

#include <iostream>
#include <fstream>
#include <iomanip>
#include <sstream>
#include <string>
#include <vector>
#include <algorithm>
#include <limits>
#ifdef _WIN32
#define NOMINMAX
#include <windows.h>
#endif

using namespace std;

struct Time
{
    short h, m, s;
};

int toSeconds(const Time& t)
{
    return t.h * 3600 + t.m * 60 + t.s;
}

bool isValidTime(const Time& t)
{
    return t.h >= 0 && t.h < 24 && t.m >= 0 && t.m < 60 && t.s >= 0 && t.s < 60;
}

// Вивід часу у форматі гг:хх:сс
ostream& operator<<(ostream& os, const Time& t)
{
    char old = os.fill('0');
    os << setw(2) << t.h << ':' << setw(2) << t.m << ':' << setw(2) << t.s;
    os.fill(old);
    return os;
}

// Введення часу у форматі гг:хх:сс
istream& operator>>(istream& is, Time& t)
{
    char c1, c2;
    is >> t.h >> c1 >> t.m >> c2 >> t.s;
    if (is && (c1 != ':' || c2 != ':' || !isValidTime(t)))
        is.setstate(ios::failbit);
    return is;
}

class Train
{
private:
    int number;
    Time departureTime;
    string destination;

public:
    Train() : number(0), departureTime{ 0, 0, 0 } {}
    Train(int number, Time time, const string& destination)
        : number(number), departureTime(time), destination(destination) {}

    int getNumber() const { return number; }
    Time getDepartureTime() const { return departureTime; }
    const string& getDestination() const { return destination; }
    void setDepartureTime(const Time& t) { departureTime = t; }

    // для сортування за часом відправлення
    bool operator<(const Train& other) const
    {
        return toSeconds(departureTime) < toSeconds(other.departureTime);
    }

    // запис потяга у потік (файл): номер;час;станція
    friend ostream& operator<<(ostream& os, const Train& train)
    {
        os << train.number << ';' << train.departureTime << ';' << train.destination;
        return os;
    }

    // читання потяга з потоку (файлу) у тому самому форматі
    friend istream& operator>>(istream& is, Train& train)
    {
        string line;
        if (!getline(is, line)) return is;
        if (line.empty()) { is.setstate(ios::failbit); return is; }

        stringstream ss(line);
        string numberPart, timePart, destination;
        if (!getline(ss, numberPart, ';') || !getline(ss, timePart, ';') || !getline(ss, destination))
        {
            is.setstate(ios::failbit);
            return is;
        }
        Time t;
        stringstream ts(timePart);
        if (!(ts >> t)) { is.setstate(ios::failbit); return is; }

        train = Train(stoi(numberPart), t, destination);
        return is;
    }

    void print() const
    {
        cout << "  №" << setw(5) << left << number << right
             << "  відправлення " << departureTime
             << "  ->  " << destination << '\n';
    }
};

class Railway
{
    vector<Train> trains;

    vector<Train>::iterator findTrain(int number)
    {
        return find_if(trains.begin(), trains.end(),
            [number](const Train& t) { return t.getNumber() == number; });
    }

public:
    bool addTrain(const Train& train)
    {
        if (findTrain(train.getNumber()) != trains.end()) return false; // номер має бути унікальним
        trains.push_back(train);
        return true;
    }

    void printAll() const
    {
        if (trains.empty()) { cout << "  Список потягів порожній\n"; return; }
        for (const Train& t : trains) t.print();
    }

    bool printByNumber(int number)
    {
        auto it = findTrain(number);
        if (it == trains.end()) return false;
        it->print();
        return true;
    }

    bool editDepartureTime(int number, const Time& time)
    {
        auto it = findTrain(number);
        if (it == trains.end()) return false;
        it->setDepartureTime(time);
        return true;
    }

    void sortByTime()
    {
        sort(trains.begin(), trains.end());
    }

    int printByDestination(const string& destination) const
    {
        int count = 0;
        for (const Train& t : trains)
        {
            if (t.getDestination() == destination)
            {
                t.print();
                count++;
            }
        }
        return count;
    }

    bool saveToFile(const string& fileName) const
    {
        ofstream out(fileName);
        if (!out) return false;
        for (const Train& t : trains) out << t << '\n';
        return true;
    }

    bool loadFromFile(const string& fileName)
    {
        ifstream in(fileName);
        if (!in) return false;
        vector<Train> loaded;
        Train t;
        while (in >> t) loaded.push_back(t);
        trains = loaded;
        return true;
    }

    size_t size() const { return trains.size(); }
};

// ---------- допоміжні функції введення ----------
int readInt(const string& prompt)
{
    int value;
    while (true)
    {
        cout << prompt;
        if (cin >> value) { cin.ignore(numeric_limits<streamsize>::max(), '\n'); return value; }
        if (cin.eof()) exit(0);
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cout << "  Помилка: введіть ціле число\n";
    }
}

Time readTime(const string& prompt)
{
    Time t;
    while (true)
    {
        cout << prompt;
        string line;
        if (!getline(cin, line)) exit(0);
        stringstream ss(line);
        if (ss >> t) return t;
        cout << "  Помилка: формат гг:хх:сс (напр. 08:30:00)\n";
    }
}

string readLine(const string& prompt)
{
    cout << prompt;
    string line;
    if (!getline(cin, line)) exit(0);
    return line;
}

int main()
{
#ifdef _WIN32
    SetConsoleCP(65001);
    SetConsoleOutputCP(65001);
#endif
    Railway railway;
    const string fileName = "trains.txt";

    // початкові дані
    railway.addTrain(Train(91, { 18, 45, 0 }, "Київ"));
    railway.addTrain(Train(143, { 7, 15, 0 }, "Львів"));
    railway.addTrain(Train(55, { 22, 5, 30 }, "Одеса"));
    railway.addTrain(Train(12, { 9, 0, 0 }, "Київ"));

    while (true)
    {
        cout << "\n===== Залізничний вокзал =====\n"
             << "1. Додати потяг\n"
             << "2. Усі потяги\n"
             << "3. Потяг за номером\n"
             << "4. Змінити час відправлення\n"
             << "5. Відсортувати за часом відправлення\n"
             << "6. Потяги за станцією призначення\n"
             << "7. Записати список у файл\n"
             << "8. Зчитати список з файлу\n"
             << "0. Вихід\n";
        int choice = readInt("Ваш вибір: ");

        switch (choice)
        {
        case 1:
        {
            int number = readInt("Номер потяга: ");
            Time time = readTime("Час відправлення (гг:хх:сс): ");
            string destination = readLine("Станція призначення: ");
            cout << (railway.addTrain(Train(number, time, destination))
                ? "  Потяг додано\n" : "  Потяг з таким номером вже існує\n");
            break;
        }
        case 2:
            railway.printAll();
            break;
        case 3:
            if (!railway.printByNumber(readInt("Номер потяга: ")))
                cout << "  Потяг не знайдено\n";
            break;
        case 4:
        {
            int number = readInt("Номер потяга: ");
            Time time = readTime("Новий час відправлення (гг:хх:сс): ");
            cout << (railway.editDepartureTime(number, time) ? "  Час змінено\n" : "  Потяг не знайдено\n");
            break;
        }
        case 5:
            railway.sortByTime();
            cout << "  Відсортовано:\n";
            railway.printAll();
            break;
        case 6:
        {
            string destination = readLine("Станція призначення: ");
            if (railway.printByDestination(destination) == 0)
                cout << "  Потягів до цієї станції немає\n";
            break;
        }
        case 7:
            cout << (railway.saveToFile(fileName) ? "  Збережено у " + fileName + "\n" : "  Помилка запису\n");
            break;
        case 8:
            if (railway.loadFromFile(fileName))
                cout << "  Зчитано потягів: " << railway.size() << '\n';
            else
                cout << "  Не вдалося відкрити " << fileName << '\n';
            break;
        case 0:
            return 0;
        default:
            cout << "  Невідомий пункт меню\n";
        }
    }
}
