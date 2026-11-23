"""Завдання 4. Клас Flat з перевантаженими операторами."""
import math


class Flat:
    def __init__(self, address: str, area: float, price: float, rooms: int = 1):
        if area <= 0:
            raise ValueError("Площа має бути > 0")
        if price < 0:
            raise ValueError("Ціна не може бути від'ємною")
        self.address = address
        self.area = float(area)
        self.price = float(price)
        self.rooms = rooms

    # == / != : рівність / нерівність площ
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Flat):
            return NotImplemented
        return math.isclose(self.area, other.area)

    def __ne__(self, other: object) -> bool:
        result = self.__eq__(other)
        return result if result is NotImplemented else not result

    # <, >, <=, >= : порівняння за ціною
    def __lt__(self, other: "Flat") -> bool:
        if not isinstance(other, Flat):
            return NotImplemented
        return self.price < other.price

    def __le__(self, other: "Flat") -> bool:
        if not isinstance(other, Flat):
            return NotImplemented
        return self.price <= other.price

    def __gt__(self, other: "Flat") -> bool:
        if not isinstance(other, Flat):
            return NotImplemented
        return self.price > other.price

    def __ge__(self, other: "Flat") -> bool:
        if not isinstance(other, Flat):
            return NotImplemented
        return self.price >= other.price

    __hash__ = None

    def __str__(self) -> str:
        return f"{self.address}: {self.area:g} м², {self.rooms} кімн., {self.price:,.0f} $"


if __name__ == "__main__":
    a = Flat("вул. Хрещатик, 1", 54, 95_000, 2)
    b = Flat("вул. Шевченка, 10", 54, 72_000, 2)
    c = Flat("вул. Лесі Українки, 5", 38.5, 72_000, 1)
    print(a, b, c, sep="\n")
    print("a == b (площа):", a == b, "| a != c:", a != c)
    print("a > b (ціна):", a > b, "| b <= c:", b <= c, "| c >= a:", c >= a)
