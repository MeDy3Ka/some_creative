import uuid
import random
import items

from constants import TAGS, RESOURCES

class Object:
    def __init__(self, **kwargs):
        self.id = uuid.uuid4()
        self.name = kwargs.get("name")
        self.description = kwargs.get("description")

class Spawn_circle(Object):
    
    generate_weight = 10
    tags = [TAGS.UNDESTROYABLE]
    
    def __init__(self):
        object_args = {"name": "Spawn circle",
                       "description": "Magic circle where you spawned.",
                       }
        super().__init__(**object_args)

        self.resource_type = RESOURCES.WOOD
        self.max_health = random.randint(10, 15)
        self.current_health = self.max_health

class Tree(Object):
    
    generate_weight = 10
    tags = [TAGS.CUTTABLE]
    def __init__(self):
        object_args = {"name": "Tree",
                       "description": "Simple tree. You can cut it.",
                       
                       }
        super().__init__(**object_args)

        self.resource_type = RESOURCES.WOOD
        self.max_health = random.randint(10, 15)
        self.current_health = self.max_health
        
    def depleted(self):
        self.name = "Stump"
        self.description = "Obviously there used to be a tree here."
        self.tags.remove(TAGS.CUTTABLE)
        self.max_health = None
        self.current_health = None
        loot = [items.Log()]
        return loot
        
class Rock(Object):
    
    generate_weight = 10
    tags = [TAGS.MINEABLE]
    
    def __init__(self):
        object_args = {"name": "Rock",
                       "description": "This is Rock. You can mine it.",
                       
                       }
        super().__init__(**object_args)
        self.resource_type = RESOURCES.STONE
        self.max_health = random.randint(20, 30)
        self.current_health = self.max_health
    
    def depleted(self):
        self.name = "Pit"
        self.description = "Rock was mined, there's a pit left."
        self.tags.remove(TAGS.MINEABLE)
        self.max_health = None
        self.current_health = None
        loot = [items.Boulder()]
        return loot