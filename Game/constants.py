from enum import Enum

class MOVE(Enum):
    UP = (0, -1)
    RIGHT = (1, 0)
    DOWN = (0, 1)
    LEFT = (-1, 0)

class TAGS(Enum):
    KILLABLE = 1
    CUTTABLE = 2
    MINEABLE = 3
    HARVESTABLE = 4
    GATHERABLE = 5
    UNDESTROYABLE = 6
    
    ITEM = 100
    RESOURCE = 110
    WEAPON = 120
    CRAFTABLE = 121
    
class RESOURCES(Enum):
    STONE = "Stone"
    WOOD = "Wood"
    BONE = "Bone"
    GLASS = "Glass"