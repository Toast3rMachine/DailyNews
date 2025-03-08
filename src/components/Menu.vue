<script setup lang="ts">
</script>

<template>
    <nav>
        <RouterLink :to="{name: 'registerFeed'}">
            Enregistrer un flux
        </RouterLink>
        <RouterLink :to="{name: 'flow.list'}">
            Liste des flux
        </RouterLink>
        <RouterLink :to="{name: 'preference'}">
            Préférences
        </RouterLink>
    </nav>
</template>