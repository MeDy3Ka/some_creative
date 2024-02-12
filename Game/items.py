import uuid
import random
from constants import TAGS, RESOURCES as R

class Item:
    """
    {"name": ,
     "description": ,
     "tags": ,
     "size": ,
     "weight": ,
     "min_dmg": ,
     "max_dmg": ,
     "spell_dmg": ,
     "restore_health": ,
     "durability": ,
     "resource_type": ,
     "resource_quantity": ,
     "craft_resources": ,
    }
    """
    def __init__(self, **item_args):
        self.id = uuid.uuid4()
        self.name = item_args.get('name')
        self.description = item_args.get('description')
        self.size = item_args.get('size')
        self.weight = item_args.get('weight')
        self.tags = item_args.get('tags')
        self.min_dmg = item_args.get('min_dmg')
        self.max_dmg = item_args.get('max_dmg')
        self.spell_dmg = item_args.get('spell_dmg')
        self.restore_health = item_args.get('restore_health')
        self.durability = item_args.get('durability')
        self.resource_type = item_args.get('resource_type')
        self.resource_quantity = item_args.get('resource_quantity')
        self.craft_resources = item_args.get('craft_resources')


class Stone_sword(Item):
    
    item_args = {"name": "Stone sword",
         "description": "Simple stone made of stone",
         "tags": [TAGS.ITEM, TAGS.WEAPON, TAGS.CRAFTABLE],
         "size": 2,
         "weight": 2,
         "min_dmg": 3,
         "max_dmg": 4,
         "spell_dmg": 0,
         "durability": 50,
         "craft_resources": {R.WOOD: 2, R.STONE: 2},
        }   
    
    def __init__(self):
        super().__init__(**self.item_args)
        
class Stone_greatsword(Item):
    item_args = {"name": "Stone greatsword",
         "description": "Greatsword made of stone",
         "tags": [TAGS.ITEM, TAGS.WEAPON, TAGS.CRAFTABLE],
         "size": 3,
         "weight": 3,
         "min_dmg": 5,
         "max_dmg": 10,
         "spell_dmg": 0,
         "durability": 75,
         "craft_resources": {R.WOOD: 2, R.STONE: 5},
        }
    
    def __init__(self):
        super().__init__(**self.item_args)

        
class BF_stone_sword(Item):
    
    item_args = {"name": "BF stone sword",
     "description": "Alot of stone in one sword",
     "tags": [TAGS.ITEM, TAGS.WEAPON, TAGS.CRAFTABLE],
     "size": 4,
     "weight": 4,
     "min_dmg": 10,
     "max_dmg": 20,
     "spell_dmg": 0,
     "durability": 100,
     "craft_resources": {R.WOOD: 10, R.STONE: 20},
    }

    def __init__(self):
        super().__init__(**self.item_args)


class Bone_mace(Item):
    item_args = {"name": "Bone mace",
     "description": "Bone mace to brake enemies' bones",
     "tags": [TAGS.ITEM, TAGS.WEAPON, TAGS.CRAFTABLE],
     "size": 2,
     "weight": 1,
     "min_dmg": 2,
     "max_dmg": 25,
     "spell_dmg": 0,
     "durability": 75,
     "craft_resources": {R.BONE: 15},
    }

    def __init__(self):
        super().__init__(**self.item_args)

        
class Health_flask(Item):
    item_args = {"name": "Health flask",
         "description": "You can drink it to restore health",
         "tags": [TAGS.ITEM],
         "size": 1,
         "weight": 1,
         "durability": 1,
        }
    
    def __init__(self):
        super().__init__(**self.item_args)
        
        self.restore_health = random.randint(10, 20)



class Log(Item):
    item_args = {"name": "Log",
         "description": "Simple log of wood",
         "tags": [TAGS.RESOURCE],
         "size": 2,
         "weight": 2,
         "resource_type": R.WOOD,
         "resource_quantity": 2,
        }

    def __init__(self):
        super().__init__(**self.item_args)

        
class Boulder(Item):
    item_args = {"name": "Boulder",
         "description": "Simple stone boulder",
         "tags": [TAGS.RESOURCE],
         "size": 2,
         "weight": 2,
         "resource_type": R.STONE,
         "resource_quantity": 2,
        }
    
    def __init__(self):
        super().__init__(**self.item_args)
