from nada_dsl import *

def check_value_at_position(position_value: SecretInteger, target_secret_value: Integer) -> Boolean:
    return position_value == target_secret_value

def is_zero(position_value: SecretInteger) -> Boolean:
    return position_value == Integer(0)

def nada_main():

    party1 = Party(name="Party1")
    # party2 = Party(name="Party2")

    answer_input_1 = SecretInteger(Input(name="answer_input_1", party=party1))
    answer_input_2 = SecretInteger(Input(name="answer_input_2", party=party1))
    answer_input_3 = SecretInteger(Input(name="answer_input_3", party=party1))
    answer_input_4 = SecretInteger(Input(name="answer_input_4", party=party1))
    answer_input_5 = SecretInteger(Input(name="answer_input_5", party=party1))
    answer_input_6 = SecretInteger(Input(name="answer_input_6", party=party1))
    answer_input_7 = SecretInteger(Input(name="answer_input_7", party=party1))
    answer_input_8 = SecretInteger(Input(name="answer_input_8", party=party1))
    answer_input_9 = SecretInteger(Input(name="answer_input_9", party=party1))
    answer_input_10 = SecretInteger(Input(name="answer_input_10", party=party1))
    answer_input_11 = SecretInteger(Input(name="answer_input_11", party=party1))
    answer_input_12 = SecretInteger(Input(name="answer_input_12", party=party1))
    answer_input_13 = SecretInteger(Input(name="answer_input_13", party=party1))
    answer_input_14 = SecretInteger(Input(name="answer_input_14", party=party1))
    answer_input_15 = SecretInteger(Input(name="answer_input_15", party=party1))
    answer_input_16 = SecretInteger(Input(name="answer_input_16", party=party1))

    answerGrid: list[SecretInteger] = [
        # Row 1
        answer_input_1,
        answer_input_2,
        answer_input_3,
        answer_input_4,

        # Row 2
        answer_input_5,
        answer_input_6,
        answer_input_7,
        answer_input_8,

        # Row 3
        answer_input_9,
        answer_input_10,
        answer_input_11,
        answer_input_12,

        # Row 4
        answer_input_13,
        answer_input_14,
        answer_input_15,
        answer_input_16
    ]
    playerGrid: list[SecretInteger] = answerGrid

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
    player_input_11 = SecretInteger(Input(name="player_input_11", party=party1))
    player_input_12 = SecretInteger(Input(name="player_input_12", party=party1))
    player_input_13 = SecretInteger(Input(name="player_input_13", party=party1))
    player_input_14 = SecretInteger(Input(name="player_input_14", party=party1))
    player_input_15 = SecretInteger(Input(name="player_input_15", party=party1))
    player_input_16 = SecretInteger(Input(name="player_input_16", party=party1))

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

    playerGrid[0] = is_zero(player_input_1).if_else(playerGrid[0], player_input_1)
    playerGrid[1] = is_zero(player_input_2).if_else(playerGrid[1], player_input_2)
    playerGrid[2] = is_zero(player_input_3).if_else(playerGrid[2], player_input_3)
    playerGrid[3] = is_zero(player_input_4).if_else(playerGrid[3], player_input_4)
    playerGrid[4] = is_zero(player_input_5).if_else(playerGrid[4], player_input_5)
    playerGrid[5] = is_zero(player_input_6).if_else(playerGrid[5], player_input_6)
    playerGrid[6] = is_zero(player_input_7).if_else(playerGrid[6], player_input_7)
    playerGrid[7] = is_zero(player_input_8).if_else(playerGrid[7], player_input_8)
    playerGrid[8] = is_zero(player_input_9).if_else(playerGrid[8], player_input_9)
    playerGrid[9] = is_zero(player_input_10).if_else(playerGrid[9], player_input_10)
    playerGrid[10] = is_zero(player_input_11).if_else(playerGrid[10], player_input_11)
    playerGrid[11] = is_zero(player_input_12).if_else(playerGrid[11], player_input_12)
    playerGrid[12] = is_zero(player_input_13).if_else(playerGrid[12], player_input_13)
    playerGrid[13] = is_zero(player_input_14).if_else(playerGrid[13], player_input_14)
    playerGrid[14] = is_zero(player_input_15).if_else(playerGrid[14], player_input_15)
    playerGrid[15] = is_zero(player_input_16).if_else(playerGrid[15], player_input_16)

    total = Integer(0)

    for i in range(size):
        is_match = check_value_at_position(answerGrid[i], playerGrid[i])
        total += is_match.if_else(Integer(0), Integer(1))

    # grid.append(SecretInteger.random() % Integer(10));

    outputs = [Output(total, "total", party1)]
    outputs += [Output(playerGrid[i], str(i), party1) for i in range(size)]

    return outputs