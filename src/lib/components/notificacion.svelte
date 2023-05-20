<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from '$lib/notificaciones';

  export let themes = {
    danger: "#E26D69",
    success: "#84C991",
    warning: "var(--warning)",
    info: "var(--bg-nivel-2)", //"#5bc0de",
    default: "#aaaaaa",
  };
</script>



<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      class="toast contenedor"
      style="background: {themes[notification.type]};"
      transition:fly={{ y: -30 }}
    >
      <div class="content contenedor2">{notification.message}</div>
      {#if notification.icon}<i class={notification.icon} />{/if}
    </div>
  {/each}
</div>



<style>
  .notifications {
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
    width: max-content;
  }

  .toast {
    flex: 0 0 auto;
    margin-bottom: 10px;
  }

  .content {
    padding: 8px;
    color: var(--letra);
  }
</style>
