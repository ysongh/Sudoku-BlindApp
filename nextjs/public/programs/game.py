from nada_dsl import *

def check_value_at_position(position_value: SecretInteger, target_secret_value: Integer) -> Boolean:
    return position_value == target_secret_value

def nada_main():

    party1 = Party(name="Party1")
    # party2 = Party(name="Party2")

    answerGrid: list[SecretInteger] = [
        # Row 1
        Integer(1),
        Integer(4),
        Integer(2),
        Integer(3),

        # Row 2
        Integer(2),
        Integer(3),
        Integer(1),
        Integer(4),

        # Row 3
        Integer(3),
        Integer(1),
        Integer(4),
        Integer(2),

        # Row 4
        Integer(4),
        Integer(2),
        Integer(3),
        Integer(1)
    ]
    playerGrid: list[SecretInteger] = [
        # Row 1
        Integer(1),
        Integer(4),
        Integer(2),
        Integer(3),

        # Row 2
        Integer(2),
        Integer(3),
        Integer(1),
        Integer(4),

        # Row 3
        Integer(3),
        Integer(1),
        Integer(4),
        Integer(2),

        # Row 4
        Integer(4),
        Integer(2),
        Integer(3),
        Integer(1)
    ]

    my_int1 = SecretInteger(Input(name="my_int1", party=party1))
    my_int2 = SecretInteger(Input(name="my_int2", party=party1))
    my_int3 = SecretInteger(Input(name="my_int3", party=party1))
    my_int4 = SecretInteger(Input(name="my_int4", party=party1))
    my_int5 = SecretInteger(Input(name="my_int5", party=party1))
    my_int6 = SecretInteger(Input(name="my_int6", party=party1))
    my_int7 = SecretInteger(Input(name="my_int7", party=party1))
    my_int8 = SecretInteger(Input(name="my_int8", party=party1))
    my_int9 = SecretInteger(Input(name="my_int9", party=party1))
    my_int10 = SecretInteger(Input(name="my_int10", party=party1))

    size = 16

    player_target_1 = SecretInteger(Input(name="player_target_1", party=party1))
    player_target_2 = SecretInteger(Input(name="player_target_2", party=party1))
    player_target_3 = SecretInteger(Input(name="player_target_3", party=party1))
    player_target_4 = SecretInteger(Input(name="player_target_4", party=party1))
    player_target_5 = SecretInteger(Input(name="player_target_5", party=party1))
    player_target_6 = SecretInteger(Input(name="player_target_6", party=party1))
    player_target_7 = SecretInteger(Input(name="player_target_7", party=party1))
    player_target_7 = SecretInteger(Input(name="player_target_7", party=party1))
    player_target_8 = SecretInteger(Input(name="player_target_8", party=party1))
    player_target_9 = SecretInteger(Input(name="player_target_9", party=party1))
    player_target_10 = SecretInteger(Input(name="player_target_10", party=party1))
    
    player_input_1 = SecretInteger(Input(name="player_input_1", party=party1))
    player_input_2 = SecretInteger(Input(name="player_input_2", party=party1))
    player_input_3 = SecretInteger(Input(name="player_input_3", party=party1))
    player_input_4 = SecretInteger(Input(name="player_input_4", party=party1))
    player_input_5 = SecretInteger(Input(name="player_input_5", party=party1))
    player_input_6 = SecretInteger(Input(name="player_input_6", party=party1))
    player_input_7 = SecretInteger(Input(name="player_input_7", party=party1))
    player_input_8 = SecretInteger(Input(name="player_input_8", party=party1))
    player_input_9 = SecretInteger(Input(name="player_input_9", party=party1))
    player_input_10 = SecretInteger(Input(name="player_input_10", party=party1))

    for i in range(size):
        is_target_1 = check_value_at_position(my_int1, Integer(i))
        is_target_2 = check_value_at_position(my_int2, Integer(i))
        is_target_3 = check_value_at_position(my_int3, Integer(i))
        is_target_4 = check_value_at_position(my_int4, Integer(i))
        is_target_5 = check_value_at_position(my_int5, Integer(i))
        is_target_6 = check_value_at_position(my_int6, Integer(i))
        is_target_7 = check_value_at_position(my_int7, Integer(i))
        is_target_8 = check_value_at_position(my_int8, Integer(i))
        is_target_9 = check_value_at_position(my_int9, Integer(i))
        is_target_10 = check_value_at_position(my_int10, Integer(i))

        playerGrid[i] = is_target_1.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_2.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_3.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_4.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_5.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_6.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_7.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_8.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_9.if_else(Integer(0), playerGrid[i])
        playerGrid[i] = is_target_10.if_else(Integer(0), playerGrid[i])

    for i in range(size):
        is_target_1 = check_value_at_position(player_target_1, Integer(i))
        is_target_2 = check_value_at_position(player_target_2, Integer(i))
        is_target_3 = check_value_at_position(player_target_3, Integer(i))
        is_target_4 = check_value_at_position(player_target_4, Integer(i))
        is_target_5 = check_value_at_position(player_target_5, Integer(i))
        is_target_6 = check_value_at_position(player_target_6, Integer(i))
        is_target_7 = check_value_at_position(player_target_7, Integer(i))
        is_target_8 = check_value_at_position(player_target_8, Integer(i))
        is_target_9 = check_value_at_position(player_target_9, Integer(i))
        is_target_10 = check_value_at_position(player_target_10, Integer(i))

        playerGrid[i] = is_target_1.if_else(player_input_1, playerGrid[i])
        playerGrid[i] = is_target_2.if_else(player_input_2, playerGrid[i])
        playerGrid[i] = is_target_3.if_else(player_input_3, playerGrid[i])
        playerGrid[i] = is_target_4.if_else(player_input_4, playerGrid[i])
        playerGrid[i] = is_target_5.if_else(player_input_5, playerGrid[i])
        playerGrid[i] = is_target_6.if_else(player_input_6, playerGrid[i])
        playerGrid[i] = is_target_7.if_else(player_input_7, playerGrid[i])
        playerGrid[i] = is_target_8.if_else(player_input_8, playerGrid[i])
        playerGrid[i] = is_target_9.if_else(player_input_9, playerGrid[i])
        playerGrid[i] = is_target_10.if_else(player_input_10, playerGrid[i])

    # grid.append(SecretInteger.random() % Integer(10));

    return [
        Output(playerGrid[i], str(i), party1)
        for i in range(size)
    ]