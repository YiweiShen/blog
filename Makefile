.PHONY: help dev build start lint format type-check

help:
	@echo "Available commands:"
	@echo "  make dev         Start development server"
	@echo "  make build       Build the project"
	@echo "  make start       Start production server"
	@echo "  make lint        Run ESLint"
	@echo "  make format      Format code with Prettier"
	@echo "  make type-check  Run TypeScript type check"

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

format:
	npm run format

type-check:
	npm run type-check