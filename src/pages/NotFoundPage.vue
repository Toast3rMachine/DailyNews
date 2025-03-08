<script setup lang="ts">

</script>

<template>
    <div class="bg-slate-500 min-h-screen h-full p-4 space-y-4">
        <h1 class="text-4xl">Erreur 404: La page demandée n'existe pas.</h1>
        <RouterLink :to="{name: 'flow.list'}" class="bg-rosewood text-2xl w-fit p-2 rounded-xl text-white cursor-pointer hover:bg-red-900 mr-4">
            Retour à la liste des flux
        </RouterLink>
    </div>
</template>