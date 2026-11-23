"""Завдання 2. Клас Circle з перевантаженими операторами."""
import math
from functools import total_ordering


@total_ordering  # з __eq__ та __lt__ автоматично отримуємо <=, >, >=
class Circle:
    def __init__(self, radius: float):
        self.radius = radius

    @property
    def radius(self) -> float:
        return self._radius

    @radius.setter
    def radius(self, value: float) -> None:
        if not isinstance(value, (int, float)):
            raise TypeError("Радіус має бути числом")
        if value < 0:
            raise ValueError("Радіус не може бути від'ємним")
        self._radius = float(value)

    @property
    def length(self) -> float:
        """Довжина кола."""
        return 2 * math.pi * self._radius

    # == : рівність радіусів
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Circle):
            return NotImplemented
        return math.isclose(self._radius, other._radius)

    # <, >, <=, >= : порівняння довжин кіл
    def __lt__(self, other: "Circle") -> bool:
        if not isinstance(other, Circle):
            return NotImplemented
        return self.length < other.length and not math.isclose(self.length, other.length)

    # +, - : нове коло зі зміненим радіусом
    def __add__(self, delta: float) -> "Circle":
        return Circle(self._radius + delta)

    def __sub__(self, delta: float) -> "Circle":
        return Circle(self._radius - delta)

    # +=, -= : змінюємо поточне коло
    def __iadd__(self, delta: float) -> "Circle":
        self.radius = self._radius + delta
        return self

    def __isub__(self, delta: float) -> "Circle":
        self.radius = self._radius - delta
        return self

    def __hash__(self):
        return hash(round(self._radius, 9))

    def __str__(self) -> str:
        return f"Circle(r={self._radius:g}, L={self.length:.2f})"


if __name__ == "__main__":
    a, b = Circle(5), Circle(3)
    print(a, b)
    print("a == b:", a == b, "| a > b:", a > b, "| a <= b:", a <= b)
    c = b + 2
    print("b + 2 =", c, "| c == a:", c == a)
    a -= 1
    print("a -= 1 ->", a)
