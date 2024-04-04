import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import {
  DEMO_PERSONAS,
  getActivePersona,
  resetDemoState,
  setActivePersona,
} from "@/mocks/demoStore";

export default function DemoPersonaSwitcher({ compact = false }) {
  const navigate = useNavigate();
  const [personaId, setPersonaId] = useState(getActivePersona().id);
  const activePersona =
    DEMO_PERSONAS.find((persona) => persona.id === personaId) ??
    DEMO_PERSONAS[0];

  const changePersona = (nextPersonaId) => {
    setActivePersona(nextPersonaId);
    setPersonaId(nextPersonaId);
    navigate(compact ? "/" : "/filter");
    window.location.reload();
  };

  const reset = () => {
    const state = resetDemoState();
    setPersonaId(state.activePersonaId);
    navigate("/");
    window.location.reload();
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Form.Select
          aria-label="데모 프로필 선택"
          size="sm"
          value={personaId}
          onChange={(event) => changePersona(event.target.value)}
          className="min-w-[170px]"
        >
          {DEMO_PERSONAS.map((persona) => (
            <option key={persona.id} value={persona.id}>
              {persona.emoji} {persona.label}
            </option>
          ))}
        </Form.Select>
        <Button as={Link} to="/profile" size="sm" variant="light">
          내 정보
        </Button>
        <Button size="sm" variant="outline-light" onClick={reset}>
          초기화
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white/95 p-4 text-slate-900 shadow-lg">
      <div className="mb-3">
        <strong>데모 프로필</strong>
        <p className="mb-0 mt-1 text-sm text-slate-600">
          {activePersona.summary} · {activePersona.description}
        </p>
      </div>
      <Form.Select
        aria-label="데모 프로필 선택"
        value={personaId}
        onChange={(event) => changePersona(event.target.value)}
      >
        {DEMO_PERSONAS.map((persona) => (
          <option key={persona.id} value={persona.id}>
            {persona.emoji} {persona.label} — {persona.summary}
          </option>
        ))}
      </Form.Select>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => navigate("/filter")} variant="primary">
          조건 설정하기
        </Button>
        <Button onClick={() => navigate("/recommend")} variant="outline-primary">
          추천 바로 보기
        </Button>
      </div>
      <div className="mt-2 text-xs text-slate-500">
        실제 자격 판정이 아닌 2024년 프로젝트 구조를 재현한 샘플입니다.
      </div>
    </div>
  );
}
