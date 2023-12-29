export async function Colours(): Promise<string[]> {
    try {
        const response = await fetch(
            'https://www.colr.org/json/colors/random/25'
        );
        const data = await response.json();
        return data.colors.map((c: any) => `#${c.hex}`);
    } catch (error) {
        console.error('Failed to fetch colors', error);
        return [];
    }
}
