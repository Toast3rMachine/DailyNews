<script setup lang="ts">
</script>

<template>
    <nav class="text-white text-2xl space-x-4 p-4 bg-slate-700">
        <RouterLink :to="{name: 'registerFeed'}" class="hover:text-slate-300">
            Enregistrer un flux
        </RouterLink>
        <RouterLink :to="{name: 'flow.list'}" class="hover:text-slate-300">
            Liste des flux
        </RouterLink>
        <RouterLink :to="{name: 'preference'}" class="hover:text-slate-300">
            Préférences
        </RouterLink>
    </nav>
</template>