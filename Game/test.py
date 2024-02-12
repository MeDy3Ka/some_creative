import random
class Person:
    def __init__(self, **kwargs):
        self.name = kwargs.get("name")
        self.second_name = kwargs.get("second_name")
        self.sir_name = kwargs.get("sir_name")
    def introduce(self):
        return self.name+" "+self.second_name+" "+self.sir_name if self.sir_name else self.name+" "+self.second_name
        
        
Kush = Person(name="Kush", second_name="Raskunov")
Bush = Person(name="Bush", second_name="Gorbutin", sir_name="GORBIDDEN")
print(Kush.introduce())
print(Bush.introduce())

print(random.randint(0, 3))