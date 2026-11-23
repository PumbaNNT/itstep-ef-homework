"""Завдання 1. Класи Money та Product."""


class Money:
    """Гроші в одній валюті: ціла частина + копійки (0..99)."""

    def __init__(self, whole: int = 0, cents: int = 0, currency: str = "грн"):
        self.currency = currency
        self.set(whole, cents)

    # ---------- задання значень ----------
    def set(self, whole: int, cents: int = 0) -> None:
        """Задати суму. Копійки > 99 переносяться в цілу частину."""
        if not isinstance(whole, int) or not isinstance(cents, int):
            raise TypeError("Ціла частина та копійки мають бути цілими числами")
        total = whole * 100 + cents
        if total < 0:
            raise ValueError("Сума не може бути від'ємною")
        self._whole, self._cents = divmod(total, 100)

    @property
    def whole(self) -> int:
        return self._whole

    @whole.setter
    def whole(self, value: int) -> None:
        self.set(value, self._cents)

    @property
    def cents(self) -> int:
        return self._cents

    @cents.setter
    def cents(self, value: int) -> None:
        self.set(self._whole, value)

    def to_cents(self) -> int:
        return self._whole * 100 + self._cents

    @classmethod
    def from_cents(cls, total: int, currency: str = "грн") -> "Money":
        return cls(0, total, currency)

    # ---------- арифметика (тільки одна валюта) ----------
    def _check(self, other: "Money") -> None:
        if not isinstance(other, Money):
            raise TypeError("Операція можлива тільки з Money")
        if other.currency != self.currency:
            raise ValueError("Різні валюти")

    def __add__(self, other: "Money") -> "Money":
        self._check(other)
        return Money.from_cents(self.to_cents() + other.to_cents(), self.currency)

    def __sub__(self, other: "Money") -> "Money":
        self._check(other)
        return Money.from_cents(self.to_cents() - other.to_cents(), self.currency)

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Money) and self.currency == other.currency and self.to_cents() == other.to_cents()

    def __lt__(self, other: "Money") -> bool:
        self._check(other)
        return self.to_cents() < other.to_cents()

    # ---------- виведення ----------
    def __str__(self) -> str:
        return f"{self._whole}.{self._cents:02d} {self.currency}"

    def __repr__(self) -> str:
        return f"Money({self._whole}, {self._cents}, {self.currency!r})"

    def display(self) -> None:
        """Вивести суму на екран."""
        print(self)


class Product:
    """Товар з ціною у вигляді Money."""

    def __init__(self, name: str, price: Money):
        if not name:
            raise ValueError("Назва товару не може бути порожньою")
        self.name = name
        self.price = price

    def decrease_price(self, whole: int = 0, cents: int = 0) -> None:
        """Зменшити ціну на задану суму. Ціна не може стати від'ємною."""
        amount = Money(whole, cents, self.price.currency)
        if amount > self.price:
            raise ValueError("Не можна зменшити ціну більше, ніж вона є")
        self.price = self.price - amount

    def display(self) -> None:
        print(self)

    def __str__(self) -> str:
        return f"{self.name}: {self.price}"


if __name__ == "__main__":
    m = Money(10, 250)          # 250 копійок -> +2 грн
    m.display()                 # 12.50 грн
    m.cents = 5
    m.display()                 # 12.05 грн

    p = Product("Кава", Money(89, 90))
    p.display()                 # Кава: 89.90 грн
    p.decrease_price(10, 95)
    p.display()                 # Кава: 78.95 грн
