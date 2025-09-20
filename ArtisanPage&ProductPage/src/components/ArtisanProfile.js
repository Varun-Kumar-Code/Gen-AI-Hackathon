import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import "./ArtisanProfile.css";
// import local gmail svg (download the SVG to src/assets/gmail.png)
import GmailIcon from "../assets/gmail.png";
import BottomNavigation from "./BottomNavigation";

const samplePhotos = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=60",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60",
  "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=60"
];


export default function ArtisanProfile() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("ap_dark");
      if (saved != null) return saved === "1";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ap_dark", dark ? "1" : "0");
    } catch { }
  }, [dark]);

  useEffect(() => {
    document.body.classList.toggle("ap-dark", dark);
    return () => document.body.classList.remove("ap-dark");
  }, [dark]);

  // avatar preview + file picker refs
  const defaultAvatar = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=60";
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const fileRef = useRef(null);
  const prevBlobRef = useRef(null);

  function handleCameraClick() {
    fileRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // create a preview URL and revoke previous blob URL if any
    const url = URL.createObjectURL(file);
    if (prevBlobRef.current) {
      try { URL.revokeObjectURL(prevBlobRef.current); } catch { }
    }
    prevBlobRef.current = url;
    setAvatarUrl(url);

    // TODO: upload the `file` to server here if required.
    // e.g. uploadFile(file).then(...)
  }

  useEffect(() => {
    return () => {
      if (prevBlobRef.current) {
        try { URL.revokeObjectURL(prevBlobRef.current); } catch { }
      }
    };
  }, []);

  // posts state (starts from samplePhotos) and file refs for uploads
  const [posts, setPosts] = useState(() => samplePhotos.slice());

  const postFileRef = useRef(null);
  const createdBlobRefs = useRef([]);

  useEffect(() => {
    return () => {
      createdBlobRefs.current.forEach(u => { try { URL.revokeObjectURL(u); } catch { } });
      createdBlobRefs.current = [];
    };
  }, []);

  function handleAddPostClick() {
    postFileRef.current?.click();
  }

  function handlePostFiles(e) {
    const files = e.target.files;
    if (!files?.length) return;
    const urls = Array.from(files).map(file => {
      const url = URL.createObjectURL(file);
      createdBlobRefs.current.push(url);
      return url;
    });
    setPosts(prev => [...urls, ...prev]);
    e.target.value = "";
  }

  // profile name (existing)
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem("ap_name") || "Lalisa Manobal";
    } catch {
      return "Lalisa Manobal";
    }
  });

  // email (editable) — use persisted value if available
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("ap_email") || "lalisa@example.com";
    } catch {
      return "lalisa@example.com";
    }
  });
  const [emailDraft, setEmailDraft] = useState(email);
  const [emailError, setEmailError] = useState("");

  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(name);

  useEffect(() => {
    try {
      localStorage.setItem("ap_name", name);
    } catch { }
  }, [name]);

  useEffect(() => {
    try {
      localStorage.setItem("ap_email", email);
    } catch { }
  }, [email]);

  // deletion with subtle undo (snackbar)
  const [lastDeleted, setLastDeleted] = useState(null); // { item, index }
  const deleteTimerRef = useRef(null);

  function handlePostClick(index) {
    const url = posts[index];
    if (!url) return;

    // remove optimistically
    setPosts(prev => {
      const next = prev.slice();
      const item = next.splice(index, 1)[0];
      setLastDeleted({ item, index });
      // schedule finalization
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
      deleteTimerRef.current = setTimeout(() => finalizeDelete(), 4200);
      return next;
    });
  }

  function undoDelete() {
    if (!lastDeleted) return;
    setPosts(prev => {
      const next = prev.slice();
      next.splice(lastDeleted.index, 0, lastDeleted.item);
      return next;
    });
    clearPendingDelete();
  }

  function finalizeDelete() {
    if (!lastDeleted) return;
    // revoke object URL if needed
    const url = lastDeleted.item;
    if (createdBlobRefs.current.includes(url)) {
      try { URL.revokeObjectURL(url); } catch { }
      createdBlobRefs.current = createdBlobRefs.current.filter(u => u !== url);
    }
    clearPendingDelete();
  }

  function clearPendingDelete() {
    if (deleteTimerRef.current) {
      clearTimeout(deleteTimerRef.current);
      deleteTimerRef.current = null;
    }
    setLastDeleted(null);
  }

  // edit name handlers
  function openEditName() {
    setNameDraft(name);
    setEmailDraft(email);
    setEmailError("");
    setEditingName(true);
    // keep modal focused on name only
  }
  function cancelEditName() {
    setEditingName(false);
    setNameDraft(name);
    setEmailDraft(email);
    setEmailError("");
  }
  function saveEditName() {
    const trimmed = (nameDraft || "").trim();
    // basic email validation
    const eTrim = (emailDraft || "").trim();
    const emailValid = /^\S+@\S+\.\S+$/.test(eTrim);
    if (!eTrim || !emailValid) {
      setEmailError("Enter a valid email");
      return;
    }

    if (trimmed) setName(trimmed);
    if (eTrim !== email) setEmail(eTrim); // persists via effect
    setEditingName(false);
  }

  // determine columns based on how many posts exist (1..3)
  const cols = Math.min(3, Math.max(1, posts.length || 1));

  // navigation helper (wouter)
  const [, setLocation] = useLocation();

  return (
    <div className={`profile-screen ${dark ? "dark" : ""}`}>
      <header className="top-bar">
        <button className="back">
          <span className="back-icon">‹</span>
          <span className="back-text">Back</span>
        </button>

        <div className="top-actions">
          <button
            type="button"
            className={`theme-toggle ${dark ? "dark" : ""}`}
            onClick={() => setDark((s) => !s)}
            aria-pressed={dark}
            aria-label="Toggle brightness"
          >
            <span className="sun">☀︎</span>
            <span className="toggle-knob" />
            <span className="moon">☾</span>
          </button>

          <button className="settings" aria-label="Settings">
            <span className="settings-icon">⚙</span>
          </button>
        </div>
      </header>

      <main className="profile-card">
        <h1 className="title">My Profile</h1>

        <div className="avatar-wrap">
          <div className="avatar">
            <img alt="avatar" src={avatarUrl} />
          </div>
          <button
            type="button"
            className="camera"
            onClick={handleCameraClick}
            aria-label="Change profile picture"
            title="Change profile picture"
          >
            ✎
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <div className="name">{name}</div>
        <div className="email-row" title={email}>
          <img
            src={GmailIcon}
            alt="Gmail"
            className="email-icon"
            width="18"
            height="18"
          />
          <span className="email-text">{email}</span>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="num">280</div>
            <div className="label">Product</div>
          </div>
          <div className="stat">
            <div className="num">26k</div>
            <div className="label">Followers</div>
          </div>
          <div className="stat">
            <div className="num">1k+</div>
            <div className="label">Sales</div>
          </div>
        </div>

        <div className="profile-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
          <button className="edit-btn" onClick={openEditName}>Edit Profile</button>

          {/* simple button adjacent to Edit Profile that navigates to dashboard */}
          <button
            type="button"
            className="dashboard-btn"
            onClick={() => setLocation("/dashboard")}
            title="Open dashboard"
          >
            Dashboard
          </button>
        </div>
      </main>

      <hr className="divider" />

      <section className="grid-wrap">
        {/* hidden file input used by the plus-tile */}
        <input
          ref={postFileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePostFiles}
          style={{ display: "none" }}
        />

        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          data-cols={cols}
        >
          {/* plus tile: same size as other tiles, opens file picker when clicked */}
          <div
            className="post-card new-post"
            onClick={handleAddPostClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddPostClick(); }}
            title="Add post"
          >
            <div className="plus">＋</div>
            <div className="post-label">Post</div>
          </div>

          {posts.filter(url => typeof url === "string" && url.trim()).map((url, i) => (
  <div
    key={i}
    className="post-card"
    onClick={() => handlePostClick(i)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if (e.key === 'Enter') handlePostClick(i); }}
    title="Click to delete (undo available)"
  >
    <img
      src={url}
      alt={`post-${i}`}
      onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Image"; }}
    />
  </div>
))}


        </div>
      </section>

      {/* subtle snackbar for undoing a delete */}
      {lastDeleted && (
        <div className="delete-snackbar" role="status" aria-live="polite">
          <div className="delete-text">Post deleted</div>
          <div className="snackbar-actions">
            <button className="undo-btn" onClick={undoDelete}>Undo</button>
          </div>
        </div>
      )}

      {/* edit name modal */}
      {editingName && (
        <div className="modal-backdrop" onClick={cancelEditName}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Edit profile">
            <h3>Edit profile</h3>
            <label className="label">Full name</label>
            <input className="name-input" value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} />

            <label className="label" style={{ marginTop: 8 }}>Email</label>
            <input
              className="name-input"
              value={emailDraft}
              onChange={(e) => {
                const v = e.target.value;
                setEmailDraft(v);
                if (!/^\S+@\S+\.\S+$/.test(v.trim())) setEmailError("Enter a valid email");
                else setEmailError("");
              }}
              placeholder="you@example.com"
            />
            {emailError && <div className="input-error">{emailError}</div>}

            <div className="modal-actions">
              <button className="btn btn-cancel" onClick={cancelEditName}>Cancel</button>
              <button className="btn btn-save" onClick={saveEditName} disabled={!!emailError}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom navigation component (matches reference) */}
      <BottomNavigation />
    </div>
  );
}