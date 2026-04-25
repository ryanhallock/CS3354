# CS3354 - WHATT

### Dependencies

This project requires Java 25 to be installed and useable through `JAVA_HOME` and requires `bun` to be installed.

### Tooling

Uses `bun` for the frontend.
Uses `gradle`/`gradlew` for the backend.

### Running the project

1. Start the backend server by running `./gradlew run` in the `backend` directory.
2. Start the frontend development server by running `bun dev` in the `frontend` directory
3. Open `http://localhost:5173` in your browser to access the application. 5173 is the default port for development.
4. To stop the servers, use `Ctrl + C` in the terminal where they are running.

Using `dev.sh` or `dev.bat` should also work.

### Testing

To run the tests, run `./gradlew test` in the `backend` directory. If tests have succeeded before and no changes have
happened yet, it may not show any tests being run.

Also, on any push event, we also run the tests, check the format, and lint. This is done through GitHub Actions and
split between the backend and frontend.