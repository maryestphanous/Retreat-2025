export default function AdminButton({ onUnlock }) {
    function click() {
      const code = prompt("Enter admin passcode");
      if (code === "123456") onUnlock();
      else alert("Wrong code");
    }
    return (
      <button onClick={click} className="btn btn-accent btn-sm">
        Admin
      </button>
    );
  }
  