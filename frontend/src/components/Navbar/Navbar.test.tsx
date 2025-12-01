import Navbar from './Navbar';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest';
import React from 'react';

describe("Navbar", () => {
  it("renders all links", () => {
    render(<Navbar />);
    expect(screen.getByText("Pantry")).toBeInTheDocument();
    expect(screen.getByText("Grocery List")).toBeInTheDocument();
    expect(screen.getByText("Past Items")).toBeInTheDocument();
    expect(screen.getByText("Recipes")).toBeInTheDocument();
  });
})