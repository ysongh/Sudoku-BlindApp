from nada_dsl import *

def check_value_at_position(position_value: SecretInteger, target_secret_value: Integer) -> Boolean:
    return position_value == target_secret_value

def nada_main():

    party1 = Party(name="Party1")
    party2 = Party(name="Party2")

    answerGrid: list[SecretInteger] = [Integer(1), Integer(3), Integer(2), Integer(4)]
    playerGrid: list[SecretInteger] = [Integer(1), Integer(3), Integer(2), Integer(4)]

    size: 4

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))

    player_target = SecretInteger(Input(name="player_target", party=party1))
    player_input = SecretInteger(Input(name="player_input", party=party1))

    for i in range(4):
        is_target = check_value_at_position(my_int1, Integer(i))
        playerGrid[i] = is_target.if_else(my_int2, playerGrid[i])
    
    for i in range(4):
        is_target = check_value_at_position(player_target, Integer(i))
        playerGrid[i] = is_target.if_else(player_input, playerGrid[i])

    # grid.append(SecretInteger.random() % Integer(10));

    return [
        Output(playerGrid[i], str(i), party1)
        for i in range(4)
    ]