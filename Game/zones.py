import uuid
import random

import items
import objects
from constants import TAGS, RESOURCES

class Zone:
    def __init__(self, **kwargs):
        self.id = uuid.uuid4()
        self.name = kwargs.get('name')
        self.description = kwargs.get('description')
        self.object_entries = []
        self.possible_objects = kwargs.get("possible_objects")
        self.static_objects = kwargs.get("static_objects")
        self.minimum_generated_objects = kwargs.get("minimum_generated_objects")
        self.maximum_generated_objects = kwargs.get("maximum_generated_objects")
        
        self.generate_objects()
        
    
    def generate_objects(self):
        if self.static_objects:
            for obj in self.static_objects:
                self.object_entries.append(obj())
                
        if self.possible_objects:
            if not self.minimum_generated_objects:
                self.minimum_generated_objects = 0
            quantity = random.randint(self.minimum_generated_objects, self.maximum_generated_objects)
            print(quantity)
            entries = random.choices(list(self.possible_objects), list(map(lambda x: x.generate_weight, self.possible_objects)), k = quantity)
            for entry in entries:
                self.object_entries.append(entry())

class Grass(Zone):
    
    generate_weight = 10
    tile = "G"
    tags = [TAGS.UNDESTROYABLE]
    def __init__(self):
        zone_kwargs = {"name": "Grass",
                       "description": "Grass plain.",
                       }
        super().__init__(**zone_kwargs)
        

class Spawn_point(Zone):
    
    generate_weight = 0
    tile = "@"
    tags = [TAGS.UNDESTROYABLE]
    
    def __init__(self):
        zone_kwargs = {"name": "Spawn",
                       "description": "Spawn point. You starts here.",
                       "static_objects": [objects.Spawn_circle],
                       }
        super().__init__(**zone_kwargs)
        

class Finish(Zone):
    
    generate_weight = 2
    tile = "#"
    tags = [TAGS.UNDESTROYABLE]
    
    def __init__(self):
        zone_kwargs = {"name": "Finish",
                       "description": "Finish point. Here you can go to the next floor.",
                       }
        super().__init__(**zone_kwargs)

        
class Forest(Zone):
    
    generate_weight = 10
    tile = "F"
    tags = [TAGS.UNDESTROYABLE]
    def __init__(self):
        zone_kwargs = {"name": "Forest",
                       "description": "Big forest. You can find trees here.",
                       "possible_objects": [objects.Tree],
                       "maximum_generated_objects": 5,
                       }
        super().__init__(**zone_kwargs)
        
class Hills(Zone):
    
    generate_weight = 10
    tile = "H"
    tags = [TAGS.UNDESTROYABLE]
    
    def __init__(self):
        zone_kwargs = {"name": "Hills",
                       "description": "Hills. You can try to mine some resources here.",
                       "possible_objects": [objects.Rock],
                       "maximum_generated_objects": 3,
                       }
        super().__init__(**zone_kwargs)
