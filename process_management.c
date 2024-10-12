#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main() {
    pid_t pid = fork(); // Crée un nouveau processus enfant

    // Vérifie s'il y a eu une erreur lors de la création du processus enfant
    if (pid < 0) {
        perror("Erreur lors de la création du processus enfant");
        exit(EXIT_FAILURE);
    } else if (pid == 0) {
        // Processus enfant
        printf("Je suis le processus enfant avec PID %d\n", getpid());

        char *programme = "wine"; // Spécifiez le programme de compatibilité Windows
        char *arguments[] = {"wine", "notepad.exe", NULL};

        if (execvp(programme, arguments) == -1) {
            perror("Erreur lors de l'exécution du programme dans le processus enfant");
            exit(EXIT_FAILURE);
        }
    } else {
        // Processus parent
        printf("Je suis le processus parent avec PID %d et mon enfant a PID %d\n", getpid(), pid);

        // Attend que le processus enfant se termine
        int status;
        waitpid(pid, &status, 0);
        
        if (WIFEXITED(status)) {
            printf("Le processus enfant s'est terminé avec le code de sortie %d\n", WEXITSTATUS(status));
        } else {
            printf("Le processus enfant ne s'est pas terminé normalement\n");
        }
    }
    
    return 0;
}