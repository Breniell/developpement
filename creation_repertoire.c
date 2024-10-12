#include <stdio.h>
#include <sys/stat.h>

// Fonction pour créer un répertoire
void creerRepertoire(const char *nomRepertoire) {
    if (mkdir(nomRepertoire, 0777) == -1) {
        printf("Erreur lors de la création du répertoire.\n");
    } else {
        printf("Répertoire créé avec succès.\n");
    }
}

int main() {
    creerRepertoire("nouveau_repertoire");
    return 0;
}

