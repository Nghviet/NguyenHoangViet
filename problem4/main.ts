/**
 * 
 * Validating input function for all three function for quick update 
 */
function validating_input(n: number): void {
	if(n < 0) throw new Error("Invalid input for n, expecting non-negative integer, receiced: " + n);
}

/**
 * Math calcuation
 * Time complexity: O(1)
 * Space complexity: O(1)
 */
function sum_to_n_a(n: number): number {
	validating_input(n);
	return n * (n + 1) >> 1;
};

/**
 * For loop for sum calculation
 * Time complexity: O(N)
 * Space complexity: O(1)
 */
function sum_to_n_b(n: number) : number{
	validating_input(n);
	var sum = 0;
	for(var i = 0; i <= n; i++) sum += i;
	return sum;
};


/**
 * Recursion with map caching to prevent recalculation
 * Time complexity: O(Q)
 * Space complexity: O(Q) with Q is maximum value N greater than 1 the function have calculated 
 */

var sum_dict = {}; 
function sum_to_n_c(n: number): number {
	validating_input(n);

	if(n <= 1) return n;

	if(sum_dict[n] != undefined) 
		return sum_dict[n];

	var value = sum_to_n_c(n - 1) + n;
	sum_dict[n] = value;

	return value;

};


for(var i = 0; i < 10; i++) {
	console.log(sum_to_n_a(i) + " " + sum_to_n_b(i) + " " + sum_to_n_c(i));
}