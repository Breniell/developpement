#include <stdio.h>

// Fonction pour lire un fichier
void lireFichier(const char *cheminFichier) {
    FILE *fichier = fopen(cheminFichier, "r");
    if (fichier == NULL) {
        perror("Erreur lors de l'ouverture du fichier");
    } else {
        char caractere;
        while ((caractere = fgetc(fichier)) != EOF) {
            printf("%c", caractere);
        }
        fclose(fichier);
    }
}

int main() {
    // Chemin complet du fichier
    const char *chemin = "/mnt/d/developpement/lecture_fichier.c";
    lireFichier(chemin);
    return 0;
}
