"""Завдання 3. Клас Airplane з перевантаженими операторами.

Увага: == порівнює ТИП, а < > <= >= - МІСТКІСТЬ, тому всі оператори
порівняння написані явно (functools.total_ordering тут дав би неправильний
результат, бо виводить > з == ).
"""


class Airplane:
    def __init__(self, model: str, plane_type: str, max_passengers: int, passengers: int = 0):
        if max_passengers <= 0:
            raise ValueError("Максимальна кількість пасажирів має бути > 0")
        self.model = model
        self.plane_type = plane_type
        self.max_passengers = max_passengers
        self.passengers = 0
        self._set_passengers(passengers)

    def _set_passengers(self, count: int) -> None:
        if not isinstance(count, int):
            raise TypeError("Кількість пасажирів має бути цілим числом")
        if count < 0:
            raise ValueError("Пасажирів не може бути менше 0")
        if count > self.max_passengers:
            raise ValueError(f"Перевищено місткість ({self.max_passengers})")
        self.passengers = count

    # == : рівність типів літаків
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Airplane):
            return NotImplemented
        return self.plane_type.lower() == other.plane_type.lower()

    # <, >, <=, >= : порівняння за максимальною кількістю пасажирів
    def __lt__(self, other: "Airplane") -> bool:
        if not isinstance(other, Airplane):
            return NotImplemented
        return self.max_passengers < other.max_passengers

    def __le__(self, other: "Airplane") -> bool:
        if not isinstance(other, Airplane):
            return NotImplemented
        return self.max_passengers <= other.max_passengers

    def __gt__(self, other: "Airplane") -> bool:
        if not isinstance(other, Airplane):
            return NotImplemented
        return self.max_passengers > other.max_passengers

    def __ge__(self, other: "Airplane") -> bool:
        if not isinstance(other, Airplane):
            return NotImplemented
        return self.max_passengers >= other.max_passengers

    # +, - : новий об'єкт зі зміненою кількістю пасажирів
    def __add__(self, count: int) -> "Airplane":
        return Airplane(self.model, self.plane_type, self.max_passengers, self.passengers + count)

    def __sub__(self, count: int) -> "Airplane":
        return Airplane(self.model, self.plane_type, self.max_passengers, self.passengers - count)

    # +=, -= : змінюємо поточний літак
    def __iadd__(self, count: int) -> "Airplane":
        self._set_passengers(self.passengers + count)
        return self

    def __isub__(self, count: int) -> "Airplane":
        self._set_passengers(self.passengers - count)
        return self

    __hash__ = None  # об'єкт змінюваний

    def __str__(self) -> str:
        return f"{self.model} ({self.plane_type}): {self.passengers}/{self.max_passengers} пасажирів"


if __name__ == "__main__":
    a = Airplane("Boeing 737", "пасажирський", 189, 120)
    b = Airplane("Airbus A320", "пасажирський", 180)
    c = Airplane("An-225", "вантажний", 6)
    print(a, b, c, sep="\n")
    print("a == b (тип):", a == b, "| a == c:", a == c)
    print("a > b (місткість):", a > b, "| c < b:", c < b)
    b += 50
    print("b += 50 ->", b)
    print("a - 20 ->", a - 20)
