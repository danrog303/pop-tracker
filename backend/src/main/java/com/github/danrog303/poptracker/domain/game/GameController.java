package com.github.danrog303.poptracker.domain.game;

import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class GameController {
    private final GameService gameService;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @GetMapping("/subcategories/{subcategoryId}/games")
    public List<Game> findBooksOfSubcategory(@PathVariable String subcategoryId) {
        return gameService.findGamesOfSubcategory(subcategoryId);
    }

    @GetMapping("/games/{gameId}")
    public Game getBookById(@PathVariable String gameId) {
        return gameService.getGameById(gameId);
    }

    @DeleteMapping("/games/{gameId}")
    public Game deleteBook(@PathVariable String gameId) {
        return gameService.deleteGame(gameId);
    }

    @PostMapping("/subcategories/{subcategoryId}/games")
    public Game createBook(@PathVariable String subcategoryId,
                           @RequestBody Game game) {
        return gameService.createGame(subcategoryId, game);
    }

    @PutMapping("/games/{bookId}")
    public Game modifyBook(@PathVariable String bookId,
                           @RequestBody Game game) {
        return gameService.modifyGame(bookId, game);
    }
}
