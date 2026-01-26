// Marcar link ativo na sidebar
const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebar a");

sidebarLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// Capturar mudança de status no DASHBOARD
const statusSelects = document.querySelectorAll<HTMLSelectElement>(".status-select");

statusSelects.forEach(select => {
  select.addEventListener("change", (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLSelectElement)) return;

    const status: string = target.value;
    const row = target.closest("tr") as HTMLTableRowElement | null;

    console.log("Status alterado para:", status);
    console.log("Linha:", row);

    // FUTURO BACKEND:
    // fetch(`/api/agendamentos/${id}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ status })
    // });
  });
});
