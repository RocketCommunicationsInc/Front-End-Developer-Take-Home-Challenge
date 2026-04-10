function getRandomId(): string {
  if (crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  } else {
    // Simple fallback
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

function isNum(input: unknown): boolean {
  if (typeof input === 'number') {
    return !isNaN(input);
  }

  if (typeof input === 'string') {
    const parsed = parseFloat(input);
    return !isNaN(parsed);
  }

  return false;
}

export { getRandomId, isNum };
