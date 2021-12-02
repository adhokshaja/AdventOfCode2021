using System.Linq;

var input = System.IO.File.ReadAllText("inputs/day1.txt")
                .Split('\n').Select(int.Parse).ToList();

int countOffset(int o) => input.Skip(o).Select((x, i) => x > input[i] ? 1 : 0).Sum();

Console.WriteLine($"Part 1: {countOffset(1)}; Part 2: {countOffset(3)}");