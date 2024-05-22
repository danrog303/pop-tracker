package com.github.danrog303.poptracker.domain.game;

import com.github.danrog303.poptracker.domain.category.Subcategory;
import com.github.danrog303.poptracker.domain.category.SubcategoryService;
import com.github.danrog303.poptracker.domain.game.Game;
import com.github.danrog303.poptracker.domain.game.GameRepository;
import com.github.danrog303.poptracker.services.auth.AuthorizationProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
@AllArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final SubcategoryService subcategoryService;
    private final AuthorizationProvider authorizationProvider;

    @PreAuthorize("isAuthenticated()")
    public List<Game> findGamesOfSubcategory(String subcategoryId) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        return gameRepository.findAllBySubcategorySubcategoryId(subcategory.getSubcategoryId());
    }

    @PreAuthorize("isAuthenticated()")
    public Game getGameById(String gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        if (!game.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        return game;
    }

    @PreAuthorize("isAuthenticated()")
    public Game deleteGame(String gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        if (!game.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        gameRepository.deleteById(gameId);
        return game;
    }

    @PreAuthorize("isAuthenticated()")
    public Game createGame(String subcategoryId, Game game) {
        Subcategory subcategory = subcategoryService.getCategoryById(subcategoryId);
        game.setGameId(null);
        game.setSubcategory(subcategory);
        gameRepository.save(game);
        return game;
    }

    @PreAuthorize("isAuthenticated()")
    public Game modifyGame(String gameId, Game game) {
        Game g = gameRepository.findById(gameId).orElseThrow();
        if (!g.getSubcategory().getOwner().getUserId().equals(authorizationProvider.getAuthenticatedUserId())) {
            throw HttpClientErrorException.create(HttpStatus.FORBIDDEN, "Not authorized", null, null, null);
        }

        game.setGameId(gameId);
        game.setSubcategory(g.getSubcategory());
        game.setEntryCreationDate(g.getEntryCreationDate());
        return gameRepository.save(game);
    }
}
