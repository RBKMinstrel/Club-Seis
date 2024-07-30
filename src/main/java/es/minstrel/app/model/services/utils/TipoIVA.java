package es.minstrel.app.model.services.utils;

public enum TipoIVA {
    IVA4(1),
    IVA10(2),
    IVA21(3);

    private final int tipo;

    TipoIVA(int tipoIva) {
        this.tipo = tipoIva;
    }

    public int getTipo() {
        return tipo;
    }

    public static TipoIVA fromTipo(int tipo) {
        for (TipoIVA tipoIVA : TipoIVA.values()) {
            if (tipoIVA.getTipo() == tipo)
                return tipoIVA;
        }
        return null;
    }

    @Override
    public String toString() {
        return switch (tipo) {
            case 1 -> "4%";
            case 2 -> "10%";
            case 3 -> "21%";
            default -> "";
        };
    }
}
