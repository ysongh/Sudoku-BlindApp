from nada_dsl import *

def nada_main():

    party1 = Party(name="Party1")

    grid: list[SecretInteger] = []

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))

    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    grid.append(my_int1 + my_int2)

    return [Output(grid[0], "my_output", party1)]