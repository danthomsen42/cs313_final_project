CREATE TABLE game_session
(
    id SERIAL PRIMARY KEY NOT NULL
    , session_name VARCHAR(100) UNIQUE NOT NULL
    , session_password VARCHAR(100) NOT NULL
    
);

CREATE TABLE player
(
    id SERIAL PRIMARY KEY NOT NULL
    , player_name VARCHAR(100) UNIQUE NOT NULL
    , player_password VARCHAR(100) NOT NULL
    
);

CREATE TABLE game_info
(
    id SERIAL PRIMARY KEY NOT NULL
    , game_session_id INT REFERENCES game_session(id)
    , game_name VARCHAR(100) NOT NULL
    , player_1_id INT REFERENCES player(id)
    , player_2_id INT REFERENCES player(id)
    , player_1_coordinate_x INTEGER NOT NULL
    , player_1_coordinate_y INTEGER NOT NULL
    , player_2_coordinate_x INTEGER NOT NULL
    , player_2_coordinate_y INTEGER NOT NULL
    
);

INSERT INTO game_session(session_name, session_password) VALUES ('my_game', 'abc123');
INSERT INTO player(player_name, player_password) VALUES ('MadMen1', '321cba');
INSERT INTO player(player_name, player_password) VALUES ('HappyChildren3', '86325d');

INSERT INTO game_info(game_session_id, game_name, player_1_id, player_2_id, player_1_coordinate_x, player_1_coordinate_y, player_2_coordinate_x, player_2_coordinate_y) VALUES ('1', 'GameOne', '1', '2', '45', '60', '80', '100');
