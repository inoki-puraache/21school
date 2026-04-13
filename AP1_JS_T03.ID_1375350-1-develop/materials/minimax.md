## Minimax Algorithm

The `Minimax Algorithm` is a decision-making algorithm used in game theory and artificial intelligence to determine the optimal move in zero-sum games with alternating turns between two players (one aiming to minimize the result, the other to maximize it). It is used to make decisions under uncertainty.

In the context of Minimax, the scenario involves two opponents: **Max** — the maximizing player, **Min** — the minimizing player.

The algorithm builds a decision tree: **nodes** represent game states, **edges** represent possible moves, **leaves** represent terminal game states (win, loss, draw).

The main advantage of Minimax is that it guarantees an optimal decision in situations with complete information. However, in real-world applications where the decision tree is deep, it can become computationally expensive.

## How the Algorithm Works

1. **Recursive Tree Traversal**
    - Starts from the root node, which represents the current state of the game.
    - The algorithm recursively explores the tree, expanding it downward until it reaches the leaf nodes.
2. **Leaf Evaluation**
    - Once a leaf is reached, it is assigned a score (positive, negative, or zero depending on the outcome).
3. **Minimization and Maximization**
    - At each node, the algorithm minimizes the score for the Min player (seeking the lowest value)
    - or maximizes the score for the Max player (seeking the highest value).
4. **Score Propagation Upward**
    - These scores propagate upward through the tree, allowing each player to choose the best possible move at their level.
5. **Decision Making**
    - After evaluating the full tree, the algorithm returns the optimal move for the current game state.