from nada_dsl import *

def check_value_at_position(position_value: SecretInteger, target_secret_value: Integer) -> Boolean:
    return position_value == target_secret_value

def nada_main():

    party1 = Party(name="Party1")

    grid: list[SecretInteger] = [Integer(1), Integer(3), Integer(2), Integer(4)]

    size: 4

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))

    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    for i in range(4):
        is_target = check_value_at_position(my_int1, Integer(i))
        grid[i] = is_target.if_else(my_int2, grid[i])

    # grid.append(SecretInteger.random() % Integer(10));

    return [
        Output(grid[i], str(i), party1)
        for i in range(4)
    ]