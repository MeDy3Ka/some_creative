# Pygame шаблон - скелет для нового проекта Pygame
import pygame
import random
import math
from enum import Enum
from shapely.geometry import Point, LineString

WIDTH = 800
HEIGHT = 600
FPS = 60

tiles_w = 50
tiles_h = 50

MAP_WIDTH = 64 * tiles_w
MAP_HEIGHT = 64 * tiles_h
scale_coefficient = 8

# Задаем цвета

class colors(Enum):
    GRAY = (200, 200, 200)
    WHITE = (255, 255, 255)
    BLACK = (0, 0, 0)
    RED = (255, 0, 0)
    GREEN = (0, 255, 0)
    BLUE = (0, 0, 255)
    TREE = (75, 155, 0)
    STONE = (125, 125, 125)
    PLAYER = (255, 155, 205)
    MENU = (155, 75, 0)
    TOP_PANEL = (255, 200, 150)
    YELLOW = (255, 255, 0)
    LBLUE = (100, 200, 255)


class Player():
    def __init__(self):
        self.color = colors.PLAYER
        self.collision_circle_radius = 25
        self.move_speed = 1
        self.angle_dict = {(-1, -1): 225, (0, -1): 180, (1, -1): 135,
                           (-1, 0): 270, (0, 0): 0, (1, 0): 90,
                           (-1, 1): 315, (0, 1): 0, (1, 1): 45}
        self.move_angle = 0
        self.coor_x, self.coor_y = WIDTH / 2, HEIGHT / 2
        self.coords = (self.coor_x, self.coor_y)
        self.attack_bool = False
        self.angle = (0, 0)

        self.player_texture = pygame.image.load('img/my_player.png').convert_alpha()
        self.rotated_player_texture = self.player_texture

        self.player_rect = self.player_texture.get_rect(center=self.coords)

        self.sword_texture = pygame.image.load('img/sword.png').convert_alpha()
        self.attack_init()
        self.inventory_init()

    def attack_init(self):
        self.attack_rect = self.sword_texture.get_rect()
        self.rotated_attack = self.attack_rect
        self.attack_coords = self.coords
        self.at_x, self.at_y = self.attack_coords
        self.attack_collision_stretch = self.attack_coords

    def inventory_init(self):
        self.inventory = {"stone": 0, "lumber": 0}

    def move(self, angle, direction):

        self.move_angle = self.angle_dict[direction]
        x, y = angle
        if self.attack_bool:
            real_move_speed = self.move_speed / 4
        else:
            real_move_speed = self.move_speed
        # self.coor_x += real_move_speed * x
        # self.coor_y += real_move_speed * y
        # self.coords = (self.coor_x, self.coor_y)
        if self.coor_x + real_move_speed * x - self.collision_circle_radius <= game.map_texture_x:
            x = 0
        elif self.coor_x + real_move_speed * x + self.collision_circle_radius >= game.map_texture_x + MAP_WIDTH:
            x = 0
        if self.coor_y + real_move_speed * y - self.collision_circle_radius <= game.map_texture_y:
            y = 0
        elif self.coor_y + real_move_speed * y + self.collision_circle_radius >= game.map_texture_y + MAP_HEIGHT:
            y = 0

        game.map_texture_x -= real_move_speed * x
        game.map_texture_y -= real_move_speed * y
        for res in game.resources:
            res.coor_x -= real_move_speed * x
            res.coor_y -= real_move_speed * y

        self.rotated_player_texture = pygame.transform.rotate(self.player_texture, self.move_angle)

    def attack(self):
        if self.attack_bool:
            return
        self.attack_bool = True
        self.attack_angle = self.move_angle - 90
        self.attack_angle_end = self.attack_angle - 180 if self.attack_angle >= 180 else self.attack_angle + 180

    def attack_swing(self):
        if self.attack_angle == self.attack_angle_end:
            self.attack_bool = False
            game.hitted_res_list.clear()
        self.attack_angle += 5
        if self.attack_angle >= 360:
            self.attack_angle = 0
        self.attack_angle_rads = math.radians(self.attack_angle)
        self.rotated_attack = pygame.transform.rotate(self.sword_texture, self.attack_angle)
        self.at_y = self.coor_y - self.rotated_attack.get_height() / 2 + (self.collision_circle_radius * 2) * math.cos(
            self.attack_angle_rads)
        self.at_x = self.coor_x - self.rotated_attack.get_width() / 2 + (self.collision_circle_radius * 2) * math.sin(
            self.attack_angle_rads)
        self.attack_coords = (self.at_x, self.at_y)

        self.attack_collision_stretch = (
            self.coor_x + 60 * math.sin(self.attack_angle_rads),
            self.coor_y + 60 * math.cos(self.attack_angle_rads))

    def draw(self):

        self.coords = (self.coor_x, self.coor_y)
        pygame.draw.circle(screen, self.color.value, self.coords, self.collision_circle_radius)
        self.player_rect = self.rotated_player_texture.get_rect(center=self.coords)
        screen.blit(self.rotated_player_texture, self.player_rect)
        if self.attack_bool:
            self.attack_swing()
            screen.blit(self.rotated_attack, self.attack_coords)
            # pygame.draw.line(screen, colors.BLACK.value, self.coords, self.attack_collision_stretch) # отрезок коллизии меча


class Structures:
    def __init__(self):
        print(1)

class Menu_structures:
    def __init__(self, coor_list):
        self.texture = pygame.image.load('img/house.png').convert_alpha()
        self.width = coor_list[0][1][0]
        self.height = coor_list[0][0][1]
        scale_size = min(self.width, self.height) * 0.9
        self.optimised_texture = pygame.transform.scale(self.texture, (scale_size, scale_size))
        self.start_coor = (self.width*0.5, self.height*0.5)
        self.center_coors_list = []
        for box in coor_list:
            center = box[1][0] - self.start_coor[0], box[1][1] - self.start_coor[1]
            building_texture = self.optimised_texture.get_rect()
            building_texture.center = center
            self.center_coors_list.append(building_texture)

    def draw(self):
        for texture in self.center_coors_list:
            screen.blit(self.optimised_texture, texture)
class Resource:
    def __init__(self, resource_type, map_texture):
        self.map_texture = map_texture
        self.resource_type = resource_type
        if self.resource_type == "tree":
            self.tree_res()
        if self.resource_type == "stone":
            self.stone_res()
        self.coor_x = random.randint(0 + self.radius, MAP_WIDTH - self.radius)
        self.coor_y = random.randint(0 + self.radius, MAP_HEIGHT - self.radius)
        self.coords = (self.coor_x, self.coor_y)

    def tree_res(self):
        self.color = colors.TREE
        self.radius = 50
        self.max_health = random.randint(3, 5)

    def stone_res(self):
        self.color = colors.STONE
        self.radius = 25
        self.max_health = random.randint(5, 7)

    def draw(self, x_change, y_change):
        self.coor_x += x_change
        self.coor_y += y_change
        self.coords = (self.coor_x, self.coor_y)
        pygame.draw.circle(screen, self.color.value, self.coords, self.radius)


class Menu:
    def __init__(self):
        self.scale_coefficient = scale_coefficient

        side_panel_height = HEIGHT
        side_panel_width = WIDTH / self.scale_coefficient
        self.side_panel = pygame.Surface((side_panel_width, side_panel_height))
        self.side_panel.fill(colors.MENU.value)

        top_panel_width = WIDTH - side_panel_width
        top_panel_height = HEIGHT / self.scale_coefficient
        self.top_panel = pygame.Surface((top_panel_width, top_panel_height))
        self.top_panel.fill(colors.TOP_PANEL.value)

        self.inventory_text_coors = (side_panel_width, top_panel_height / 5)
        self.inventory_font = pygame.font.SysFont('serif', 20)

        self.separator_lines_coors = (
                                      ((0, side_panel_height*0.2), (side_panel_width, side_panel_height*0.2)),
                                      ((0, side_panel_height*0.4), (side_panel_width, side_panel_height*0.4)),
                                      ((0, side_panel_height*0.6), (side_panel_width, side_panel_height*0.6)),
                                      ((0, side_panel_height*0.8), (side_panel_width, side_panel_height*0.8)),
                                      ((0, side_panel_height), (side_panel_width, side_panel_height))
                                      )

        self.line_color = colors.BLACK

        for sep_line in self.separator_lines_coors:
            pygame.draw.line(self.side_panel, self.line_color.value, sep_line[0], sep_line[1])


    def draw(self):
        screen.blit(self.side_panel, (0, 0))
        screen.blit(self.top_panel, (WIDTH / self.scale_coefficient, 0))
        self.inventory_text = self.inventory_font.render(
            f'Lumber: {game.player.inventory["lumber"]}, Stone: {game.player.inventory["stone"]}', True,
            colors.BLACK.value)
        screen.blit(self.inventory_text, self.inventory_text_coors)


class Game:
    def __init__(self):
        self.map_init()
        self.menu = Menu()
        self.side_menu_structures = Menu_structures(self.menu.separator_lines_coors)
        self.player = Player()
        self.tree_res = 40
        self.stone_res = 25
        self.resources = []
        self.coor_x_change = 0
        self.coor_y_change = 0
        trees = 0
        stones = 0
        while trees < self.tree_res:
            res = Resource("tree", self.map_texture)
            self.resources.append(res)
            trees += 1
        while stones < self.stone_res:
            res = Resource("stone", self.map_texture)
            self.resources.append(res)
            stones += 1
        self.hitted_res_list = []

    def map_init(self):
        self.map_texture_x = 0
        self.map_texture_y = 0
        self.map_texture = pygame.Surface((tiles_w * 64, tiles_h * 64))
        tile_x = 0
        while tile_x <= tiles_w:
            tile_y = 0
            while tile_y <= tiles_h:
                tile_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
                pygame.draw.rect(self.map_texture, tile_color, ((tile_x * 64, tile_y * 64), (64, 64)))
                tile_y += 1
            tile_x += 1

    def main_cicle(self, pos):
        if pygame.mouse.get_focused():
            if WIDTH/scale_coefficient < pos[0] < WIDTH/scale_coefficient + 50 and pos[0] > self.map_texture_x:
                game.coor_x_change = 10
            elif WIDTH - 50 < pos[0] < WIDTH and pos[0] < self.map_texture_x + MAP_WIDTH:
                game.coor_x_change = -10
            else: game.coor_x_change = 0
            if HEIGHT/scale_coefficient < pos[1] < HEIGHT/scale_coefficient + 50 and pos[1] > self.map_texture_y:
                game.coor_y_change = 10
            elif HEIGHT - 50 < pos[1] < HEIGHT and pos[1] < self.map_texture_y + MAP_HEIGHT:
                game.coor_y_change = -10
            else: game.coor_y_change = 0
        pygame.draw.rect(screen, colors.BLUE.value, (pos[0] - 10, pos[1] - 10, 20, 20))

        if self.player.attack_bool == True:
            self.resource_hit()
        self.draw()

    def draw(self):
        self.map_texture_x += self.coor_x_change
        self.map_texture_y += self.coor_y_change
        screen.blit(self.map_texture, (self.map_texture_x, self.map_texture_y))
        for res in game.resources:
            res.draw(self.coor_x_change, self.coor_y_change)

        self.player.draw()

        self.menu.draw()
        self.side_menu_structures.draw()


    def player_collision_check(self, directions):
        def check(a):
            x = 1 if a else 0
            return (x)

        UP, DOWN, LEFT, RIGHT = map(check, directions)
        direction = (RIGHT - LEFT, DOWN - UP)
        x, y = direction
        for res in self.resources:
            # if abs(self.player.coor_x + self.player.move_speed * angle[0] - res.coor_x) < self.player.collision_circle_radius + res.radius and abs(self.player.coor_y - res.coor_y) < self.player.collision_circle_radius + res.radius and:
            if math.sqrt((self.player.coor_x
                          + self.player.move_speed * direction[0]
                          - res.coor_x) ** 2
                         + (self.player.coor_y - res.coor_y) ** 2) \
                    < self.player.collision_circle_radius + res.radius:
                x = 0
                # if abs(self.player.coor_y + self.player.move_speed * angle[1] - res.coor_y) < self.player.collision_circle_radius + res.radius and abs(self.player.coor_x - res.coor_x) < self.player.collision_circle_radius + res.radius and:
            if math.sqrt((self.player.coor_x - res.coor_x) ** 2
                         + (self.player.coor_y
                            + self.player.move_speed * direction[1]
                            - res.coor_y) ** 2) \
                    < self.player.collision_circle_radius + res.radius:
                y = 0
        angle = (x, y)
        self.player.move(angle, direction)

    def attack_intersection(self, coor_list):
        """Проверка коллизии отрезка и круга. возвращает return True or False"""
        (xa, ya), (xb, yb), (xo, yo), r = coor_list
        circle = Point(xo, yo).buffer(r)  # Центр в (xo, yo) и радиус r
        line = LineString([(xa, ya), (xb, yb)])  # Отрезок между точками (xa,ya), (xb, yb)
        intersection = circle.intersects(line)  # Функция проверяет пересечение
        return intersection

    def resource_hit(self):
        for res in self.resources:
            coor_list = [self.player.coords, self.player.attack_collision_stretch, res.coords, res.radius]
            if self.attack_intersection(coor_list):
                if res in self.hitted_res_list:
                    continue
                self.hitted_res_list.append(res)
                res.max_health -= 1
                if res.resource_type == "tree":
                    self.player.inventory["lumber"] += 1
                elif res.resource_type == "stone":
                    self.player.inventory["stone"] += 1
                if res.max_health == 0:
                    self.resources.remove(res)


# Создаем игру и окно
pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("My Game")
clock = pygame.time.Clock()

game = Game()

# Цикл игры
running = True
while running:
    # Держим цикл на правильной скорости
    clock.tick(FPS)
    keys = pygame.key.get_pressed()
    # Ввод процесса (события)
    for event in pygame.event.get():
        # check for closing window
        if event.type == pygame.QUIT:
            running = False
        if keys[pygame.K_SPACE]:
            attack = game.player.attack()

    if keys[pygame.K_w] or keys[pygame.K_s] or keys[pygame.K_a] or keys[pygame.K_d]:
        pressed_keys = (keys[pygame.K_w], keys[pygame.K_s], keys[pygame.K_a], keys[pygame.K_d])
        game.player_collision_check(pressed_keys)

    # Обновление
    screen.fill(colors.GRAY.value)
    game.main_cicle(pos = pygame.mouse.get_pos())



    # Рендеринг

    # После отрисовки всего, переворачиваем экран
    pygame.display.flip()

pygame.quit()