"""Перевірки для всіх 4 завдань: python test_oop.py"""
import unittest

from task1_money_product import Money, Product
from task2_circle import Circle
from task3_airplane import Airplane
from task4_flat import Flat


class MoneyProductTests(unittest.TestCase):
    def test_cents_overflow_and_str(self):
        self.assertEqual(str(Money(10, 250)), "12.50 грн")

    def test_setters(self):
        m = Money(1, 1)
        m.whole = 5
        m.cents = 7
        self.assertEqual((m.whole, m.cents), (5, 7))

    def test_negative_rejected(self):
        with self.assertRaises(ValueError):
            Money(-1)

    def test_decrease_price(self):
        p = Product("Кава", Money(89, 90))
        p.decrease_price(10, 95)
        self.assertEqual(p.price, Money(78, 95))

    def test_decrease_below_zero(self):
        p = Product("Чай", Money(5, 0))
        with self.assertRaises(ValueError):
            p.decrease_price(6)


class CircleTests(unittest.TestCase):
    def test_equality_and_compare(self):
        self.assertTrue(Circle(3) == Circle(3))
        self.assertTrue(Circle(5) > Circle(3))
        self.assertTrue(Circle(3) <= Circle(3))
        self.assertFalse(Circle(3) < Circle(3))

    def test_arithmetic(self):
        c = Circle(3)
        self.assertEqual((c + 2).radius, 5)
        self.assertEqual((c - 1).radius, 2)
        c += 4
        self.assertEqual(c.radius, 7)
        c -= 2
        self.assertEqual(c.radius, 5)
        with self.assertRaises(ValueError):
            c -= 10


class AirplaneTests(unittest.TestCase):
    def setUp(self):
        self.a = Airplane("Boeing 737", "пасажирський", 189, 120)
        self.b = Airplane("Airbus A320", "Пасажирський", 180)

    def test_type_equality(self):
        self.assertTrue(self.a == self.b)
        self.assertFalse(self.a == Airplane("An-225", "вантажний", 6))

    def test_compare_capacity(self):
        # a і b одного типу (a == b), але різної місткості
        self.assertTrue(self.a > self.b)
        self.assertTrue(self.a >= self.b)
        self.assertTrue(self.b < self.a)
        self.assertTrue(self.b <= self.a)
        self.assertFalse(self.b > self.a)

    def test_passengers(self):
        self.b += 50
        self.assertEqual(self.b.passengers, 50)
        self.b -= 20
        self.assertEqual(self.b.passengers, 30)
        self.assertEqual((self.a + 10).passengers, 130)
        self.assertEqual(self.a.passengers, 120)  # + не змінює оригінал
        with self.assertRaises(ValueError):
            self.a += 100
        with self.assertRaises(ValueError):
            self.b - 31


class FlatTests(unittest.TestCase):
    def test_area_equality(self):
        self.assertTrue(Flat("A", 54, 1) == Flat("B", 54, 2))
        self.assertTrue(Flat("A", 54, 1) != Flat("B", 38, 1))

    def test_price_compare(self):
        a, b = Flat("A", 54, 95_000), Flat("B", 40, 72_000)
        self.assertTrue(a > b)
        self.assertTrue(b < a)
        self.assertTrue(a >= a)
        self.assertTrue(b <= a)


if __name__ == "__main__":
    unittest.main(verbosity=2)
