package com.javamaster.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Game {
    private String gameId;
    private Player player1;
    private Player player2;
    private GameStatus status;
    private int[][] board;
    private TicToe winner;
}
