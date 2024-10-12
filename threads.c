#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

// Structure pour stocker les informations du thread
typedef struct {
    pthread_t thread_id;
    void *(*function)(void *);
    void *arg;
} thread_info_t;


// Fonction pour créer un thread
int create_thread(thread_info_t *thread_info, void *(*function)(void *), void *arg) {
    thread_info->function = function;
    thread_info->arg = arg;
    return pthread_create(&thread_info->thread_id, NULL, function, arg);
}


// Fonction pour arrêter un thread
int stop_thread(thread_info_t *thread_info) {
    return pthread_join(thread_info->thread_id, NULL);
}

// Fonctions pour les threads
void hello() {
    printf("Bonjour!\n");
}

void hello_user(void *arg) {
    char *name = (char *)arg;
    printf("Bonjour %s!\n", name);
}

void count_to_ten() {
    for (int i = 1; i <= 10; i++) {
        printf("%d\n", i);
        sleep(1);
    }
}

// Fonction principale
int main() {
    thread_info_t threads[10];
    int num_threads = 0;
    char choice;
    char name[50];

    while (1) {
        printf("Que voulez-vous faire?\n");
        printf("1. Dire Bonjour\n");
        printf("2. Dire Bonjour avec le nom de l'utilisateur\n");
        printf("3. Compter de 1 à 10\n");
        printf("4. Afficher le nombre de threads en cours\n");
        printf("5. Arrêter tous les threads et quitter\n");
        printf("Choix (1-5): ");
        
        scanf(" %c", &choice);

        switch (choice) {
            case '1':
                create_thread(&threads[num_threads], (void *(*)(void *))hello, NULL);
                num_threads++;
                break;
            case '2':
                printf("Entrez votre nom: ");
                scanf("%s", name);
             create_thread(&threads[num_threads], (void *(*)(void *))hello_user, (void *)name);

                num_threads++;
                break;
            case '3':
               create_thread(&threads[num_threads], (void *(*)(void *))count_to_ten, NULL);
                num_threads++;
                break;
            case '4':
                printf("Threads en cours d'exécution: %d\n", num_threads);
                break;
            case '5':
                for (int i = 0; i < num_threads; i++) {
                    stop_thread(&threads[i]);
                }
                printf("Tous les threads ont été arrêtés. Au revoir!\n");
                return 0;
            default:
                printf("Choix invalide. Veuillez sélectionner une option valide.\n");
        }
    }

    return 0;
}