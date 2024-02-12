import uuid
import random
import inspect

from constants import MOVE, TAGS, RESOURCES
import zones
import items
import objects 

class Map:
    def __init__(self):
        self.map = {}
    
    def show_map(self):
        coor_list = list(self.map.keys())
        coor_list.sort()

        # Получение минимальных и максимальных значений по x (нулевой элемент кортежа)
        min_x = min(coor_list, key=lambda item: item[0])[0]
        max_x = max(coor_list, key=lambda item: item[0])[0]
        
        # Получение минимальных и максимальных значений по y (первый элемент кортежа)
        min_y = min(coor_list, key=lambda item: item[1])[1]
        max_y = max(coor_list, key=lambda item: item[1])[1]
        y_array = []
        y = min_y
        while y <= max_y:
            x_array = []
            x = min_x
            while x <= max_x:
                coords = (x, y)
                obj = self.map.get(coords, None)
                tile = obj.tile if obj else "-"
                x_array.append(tile) 
                x += 1
            y_array.append(x_array)
            y += 1

        return y_array
        

class Event_handler:
    def __init__(self):
        self.init_game_zones()
        
    def init_game_zones(self):
        events = []
        for name, obj in inspect.getmembers(zones):
            if inspect.isclass(obj):
                if "generate_weight" in dir(obj):
                    events.append(obj)
        self.events = tuple(events)
    
    def generate_spawn_point(self):
        return zones.Spawn_point()

    
    def generate_zone(self):
        #zone = random.choices(list(self.events.keys()), list(map(lambda x: x, self.events.values())), k = 1)[0]
        zone = random.choices(list(self.events), list(map(lambda x: x.generate_weight, self.events)), k = 1)[0]
        return zone()
    
        


class Unit:
    def __init__(self, **unt_args):
        self.id = uuid.uuid4()
        self.tags = []
        self.init_stats()
        # TODO 1 
        self.weapon = items.BF_stone_sword()
        self.phys_damage_coefficient = 1
        self.spell_dmg=(1, 1)
        self.mag_damage_coefficient=1
        
    def init_stats(self):
        self.level = 1
        self.exp = 0
        self.attr_points = 0
        self.talents = 0
        
        self.str = 1
        self.agi = 1
        self.con = 1
        self.int = 1
        self.cha = 1
        self.wis = 1
        self.ver = 1
        
        self.stats = {"str": self.str, "agi": self.agi, "con": self.con,
                      "int": self.int, "cha": self.cha, "wis": self.cha,
                      "ver": self.ver}
        
        self.max_health = self.health_formula()
        self.max_mana = self.mana_formula()
        self.current_health = self.max_health
        self.current_mana = self.max_mana
    
    def exp_calculate(self, exp):
        self.exp += exp
        while self.exp >= self.expirience_formula():
            self.exp -= self.expirience_formula()
            self.level += 1
            self.attr_points += 3
            self.talents += 1
            print("You've leveluped")
    
    def expirience_formula(self):
        return int(109-(20/(self.level+1))+self.level**3)
        
    def health_formula(self):
        HP = 58 + 20*self.con + 10*self.str + 5*self.agi + 3*self.ver + 2*self.wis + 1*self.int + 1*self.cha
        return HP

    def mana_formula(self):
        MP = 58 + 20*self.wis + 10*self.int + 5*self.cha + 3*self.ver + 2*self.con + 1*self.str + 1*self.agi
        return MP
    
    def physical_damage_formula(self):
        min_weapon_dmg = self.weapon.min_dmg if self.weapon.min_dmg else 0
        max_weapon_dmg = self.weapon.max_dmg if self.weapon.max_dmg else 0
        min_dmg = (self.str + min_weapon_dmg) * self.phys_damage_coefficient
        max_dmg = (self.str + 2*self.agi + max_weapon_dmg) * self.phys_damage_coefficient
        return min_dmg, max_dmg
    
    def magical_damage_formula(self):
        min_dmg = self.spell_dmg[0] * (1 + self.int/100) * self.mag_damage_coefficient
        max_dmg = self.spell_dmg[1] * (1 + (self.cha+self.int)/100) * self.mag_damage_coefficient
        return min_dmg, max_dmg
        
    def attack(self):
        min_dmg, max_dmg = self.physical_damage_formula()
        dmg = random.randint(int(min_dmg), int(max_dmg))
        return dmg



class Mob_enemy(Unit):
    def __init__(self):
        super().__init__()
        self.tile = "E"
        self.name = "Mob"
        self.description = "This is enemy. You can fight or run."
        self.tags = [TAGS.KILLABLE]

        self.killing_exp = random.randint(30, 50)
        self.loot = {"sword": (10, 1, 1),
                     "bone": (30, 1, 3),
                     "coins": (20, 1, 10),
                     "flask": (10, 1, 2),
                     } 
        
    def generate_loot(self):
        loot = random.choices(list(self.loot.keys()), list(map(lambda x: x[0], self.loot.values())), k = 1)[0]
        loot_min, loot_max = self.loot.get(loot)[1:3]
        loot_quantity = random.randint(loot_min, loot_max)
        return loot, loot_quantity

class Player(Unit):
    def __init__(self, name):
        super().__init__()
        self.name = name
        self.coords = (0, 0)
        self.inventory = Inventory()
        
    def wield_weapon(self, weapon):
        if self.inventory.get("Stone sword"):
            self.weapon = (3, 5)
        else:
            return f"there is no {weapon} to wield in inventory"
        
    def increase_attr(self, stat):
        if self.attr_points < 1:
            return "No points available"
        player_stat = self.stats.get(stat)
        if player_stat:
            player_stat += 1
            self.attr_points -= 1
            return f"You increased {stat} by 1"
        else:
            return f"You have no stat {stat}"
        
        
    def init_professions(self):
        pass
    
    
    def show_stats(self):
        return (f'''
str = {self.str}
agi = {self.agi}
con = {self.con}
int = {self.int}
cha = {self.cha}
wis = {self.wis}
ver = {self.ver}
level = {self.level}
exp = {self.exp}/{self.expirience_formula()}
damage = {self.physical_damage_formula()[0]} - {self.physical_damage_formula()[1]}
health = {self.current_health}/{self.max_health}    mana = {self.current_mana}/{self.max_mana}''')

class Inventory:
    def __init__(self):
        self.items = []
        self.resources = {}
        
    def add_item_to_inventory(self, obj):
        self.items.append(obj)
    
    def add_resource_to_inventory(self, resource_type, resource_quantity):
        print(resource_type)
        quant = self.resources.get(resource_type)
        if not quant:
            self.resources[resource_type] = resource_quantity
            print(self.resources)
        else:
            quant += resource_quantity
            self.resources[resource_type] = quant

    
    def show(self):
        reply = 'You have:\n'
        for obj in self.items:
            reply += f'{obj.name}\n'
        for res, quant in self.resources.items():
            reply += f'{res.value} - {quant}\n'
        reply += 'in inventory'
        return reply

class Game:
    def __init__(self, player_name):
        self.game_cycle = True
        self.event_manager = Event_handler()
        self.map = Map()
        self.player = Player(player_name)
        self.spawn_init()
        self.craftables = self.craftables_init()
        
        self.create_state = False
        self.move_dict = {"up": MOVE.UP, "u": MOVE.UP,
                          "down": MOVE.DOWN, "d": MOVE.DOWN,
                          "left": MOVE.LEFT, "l": MOVE.LEFT,
                          "right": MOVE.RIGHT, "r": MOVE.RIGHT}   
    
    def spawn_init(self):
        self.map.map[self.player.coords] = self.event_manager.generate_spawn_point()
    
    def craftables_init(self):
        craftables = []
        for name, obj in inspect.getmembers(items):
            if inspect.isclass(obj):
                if "item_args" in dir(obj):
                    if TAGS.CRAFTABLE in obj.item_args.get("tags"):
                        craftables.append(obj)
        return craftables
    
    def movement(self, move):
        x, y = self.player.coords
        dx, dy = move.value
        x += dx
        y += dy
        self.player.coords = (x,y)
        zone_object = self.map.map.get(self.player.coords, None)
        if zone_object:
            return zone_object.description
        
        else:
            zone_object = self.event_manager.generate_zone()
            self.map.map[self.player.coords] = zone_object
            return zone_object.description
    
    def gather_resource(self, obj):
        
        command_tags = {"cut": TAGS.CUTTABLE,
                        "mine": TAGS.MINEABLE,
                        "harvest": TAGS.HARVESTABLE}
        
        zone = self.map.map.get(self.player.coords)
        obj = self.find_gatherable_entry(zone, command_tags.get(command))
        if not obj:
            return f"Here is nothing to {command}"     
        
        self.gather_resource_hit(obj)
        
        if obj.current_health > 0:
            return f'{obj.name} durability {obj.current_health}/{obj.max_health}'
        else:
            dropped_items = obj.depleted()
            reply = f'{obj.name} have been depleted'
            for item in dropped_items:
                zone.object_entries.append(item)
                reply += f'{item.name} dropped from {obj.name}'
            return reply

            
    def gather_resource_hit(self, obj):
        dmg = self.player.attack()
        obj.current_health -= dmg

    def find_gatherable_entry(self, zone, tag):
        for obj in zone.object_entries:
            if tag in obj.tags:
                return obj
    
    def pick_all_items(self):
        zone = self.map.map.get(self.player.coords) 
        reply = ""
        picked_objects = []
        for obj in zone.object_entries:
            if TAGS.ITEM in obj.tags:
                self.player.inventory.add_item_to_inventory(obj)
                reply += f"You picked {obj.name}\n"
                picked_objects.append(obj)
            if TAGS.RESOURCE in obj.tags:
                self.player.inventory.add_resource_to_inventory(obj.resource_type, obj.resource_quantity)
                reply += f"You picked {obj.resource_quantity} {obj.resource_type.value}\n"
                picked_objects.append(obj)
        for obj in picked_objects:
            zone.object_entries.remove(obj)
        if not reply:
            reply = "You can't pick anything here"
        return reply
                
                
    
    def combat(self, param):
        enemy = self.map.map.get(self.player.coords)
        if param == "attack":
            dmg = self.player.attack()
            
        enemy.current_health -= dmg
        if enemy.current_health > 0:
            enemy_dmg = enemy.attack()
            self.player.current_health -= enemy_dmg
            if self.player.current_health <= 0:
                game.game_cycle = False
                return f'''You deal {dmg} damage to {enemy.name}.
His current health is {enemy.current_health}/{enemy.max_health}.
{enemy.name} deal {enemy_dmg} to you.
You are dead!'''
            return f'''You deal {dmg} damage to {enemy.name}.
His current health is {enemy.current_health}/{enemy.max_health}.
{enemy.name} deal {enemy_dmg} to you.
Your health is {self.player.current_health}/{self.player.max_health}''' 
        else:
            expirience = enemy.killing_exp
            self.player.exp_calculate(expirience)
            loot, loot_quantity = enemy.generate_loot()
            self.player.add_item_to_inventory(loot, loot_quantity)
            return f'''You deal {dmg} damage to {enemy.name}.
{enemy.name} is dead.
You get {expirience} expirience and {loot_quantity} {loot}
'''

    def show_environment(self):
        reply = "You can see"
        zone_objects = self.map.map.get(self.player.coords).object_entries
        if len(zone_objects) == 0:
            reply += " nothing here."
            return reply
        
        for obj in zone_objects:
            reply += f'\n{obj.name}'
        return reply
    
    def durability_calculate(self, obj):
        obj.durability -= 1
        if obj.durability < 1:
            # TODO 2
            ...
    
    def show_craftable_list(self):
        reply = "You can craft:\n"
        for item in self.craftables:
            reply += f'{item.item_args.get("name")}\n'
        return reply
    
    def craft_manager(self, command):
        if command == "cancel":
            self.create_state = False
            return "Crafting canceled."
        
        elif command == "list":
            return self.show_craftable_list()
        
        elif command == "stone sword":
            stones = self.player.inventory.get("Stone")
            logs = self.player.inventory.get("Log")
            if stones < 2:
                return "Not enough stones"
            elif logs < 2:
                return "Not enough logs"
            else:
                stones -= 2
                logs -= 2
                self.player.inventory["Stone"] = stones
                self.player.inventory["Log"] = logs
                if self.player.inventory.get("Stone sword"):
                    self.player.inventory["Stone sword"] += 1
                else: self.player.inventory["Stone sword"] = 1
                return "You have crafted stone sword"
                

    def command_manager(self, command):
        
        if self.create_state:
            return self.craft_manager(command)
            
        elif command == "craft":
            self.create_state = True
            return '''If you want to exit craft menu type: cancel.
Enter what you want to craft, or list to see what you can craft'''
        
        elif command.startswith("gain exp"):
            command = command.split(" ")
            try: 
                exp = int(command[-1])
                self.player.exp_calculate(exp)
                return f"You gained {command[-1]} exp"
            except: return "Wrong format"

        elif command == "stats":
            return self.player.show_stats()

        elif self.move_dict.get(command): 
            move = self.move_dict.get(command)
            return self.movement(move)
        
        elif command in ["cut", "mine", "harvest"]:
            return self.gather_resource(command)
        
        elif command in ["a", "attack"]:
            if TAGS.KILLABLE not in self.map.map.get(self.player.coords).tags:
                return "Here is nothing to attack"
            return self.combat("attack")
            
        elif command in ["look"]:
            return self.show_environment()
        
        elif command == "take all":
            return self.pick_all_items()
        
        elif command in ["show map", "map"]:
            map_matrix = self.map.show_map()
            [print("-", end='') for i in range(0, 2+len(map_matrix[0]))]
            for y in map_matrix:
                print('\n-', end='')
                for x in y:
                    print(x, end='')
                print('-', end='')
            return '\n---MAP---'
        
        elif command.startswith("increase"):
            return self.player.increase_attr(command[10:])
        
        elif command == "exit":
            self.game_cycle = False
            return "Game over"
        
        elif command == "inventory":
            return self.player.inventory.show()
        
        elif command.startswith("wield"):
            self.player.wield_weapon(command[6:])
        
player_name = input("Player name:\n")         
game = Game(player_name)

print(game.event_manager.events)

while game.game_cycle:
    command = input("Command: ")
    reply = game.command_manager(command)
    print(reply)
