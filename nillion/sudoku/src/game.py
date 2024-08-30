from nada_dsl import *

def nada_main():

    party1 = Party(name="Party1")

    grid: list[SecretInteger] = []

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))

    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    grid.append(Integer(9))
    grid.append(my_int2 + my_int1)

    return [
        Output(grid[i], "my_output" + str(i), party1)
        for i in range(2)
    ]