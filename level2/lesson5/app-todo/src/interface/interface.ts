export interface MyTheme {
    relative?: boolean | undefined;
    height?: string | undefined;
    width?: string | undefined;
    justify?: string | undefined;
    align?: string | undefined;
    wrap?: string | undefined;
    padding?: string | undefined;
    margin?: string | undefined;
    alignSelf?: string | undefined;
    flex?: string | undefined;
    gap?: string | undefined;
    withBorder?: boolean | undefined;
    direction?: string | undefined;
    size?: string | undefined;
    weight?: string | undefined;
    background?: string | undefined;
    space?: string | undefined;
    red?: boolean | undefined;
    weigth?: number | undefined;
    hover?: string | undefined;
    decoration?: boolean | undefined;
}

export type TaskData = {
    id: number,
    checked: boolean,
    text: string,
    CustomerId: number
}