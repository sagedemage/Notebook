//go:build mage

package main

import (
	"github.com/magefile/mage/sh"
)

// Runs go mod download and then installs the binary.
func Build() error {
	if err := sh.Run("go", "mod", "download"); err != nil {
		return err
	}
	return sh.Run("go", "build", "-o", "build/", "-v", "./cmd/app/...")
}

func Run() error {
	if err := sh.Run("go", "mod", "download"); err != nil {
		return err
	}
	return sh.Run("go", "run", "-v", "./cmd/app/...")
}

func Test() error {
	if err := sh.Run("go", "mod", "download"); err != nil {
		return err
	}
	
	// go test -v -cover ./cmd/app/tests/...
	return sh.Run("go", "test", "-v", "-cover", "./cmd/app/tests/...")
}

func Lint() error {
	if err := sh.Run("go", "mod", "download"); err != nil {
		return err
	}
	
	// go test -v -cover ./cmd/app/tests/...
	return sh.Run("staticcheck", "./cmd/app/...")
}

